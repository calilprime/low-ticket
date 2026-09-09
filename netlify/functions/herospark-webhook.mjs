// netlify/functions/herospark-webhook.js
//
// Recebe o webhook da HeroSpark, grava a venda no Supabase e
// dispara notificação no Telegram.
//
// Variáveis de ambiente necessárias (Netlify > Site settings > Environment variables):
//   TELEGRAM_BOT_TOKEN   -> token do @BotFather
//   TELEGRAM_CHAT_ID     -> seu chat id (ver instruções)
//   SUPABASE_URL         -> https://xxxx.supabase.co
//   SUPABASE_SERVICE_KEY -> service_role key (NUNCA no front-end)
//   WEBHOOK_SECRET       -> string aleatória que você inventa, usada na URL
//   UTMIFY_API_TOKEN     -> token da credencial "API Devocional" (UTMify >
//                           Integrações > Credenciais de API). Sem ele a venda
//                           não aparece no painel da UTMify.

const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

const BRL = (v) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    Number(v || 0)
  );

// Escapa caracteres especiais do MarkdownV2 do Telegram
const esc = (s) =>
  String(s ?? "").replace(/([_*\[\]()~`>#+\-=|{}.!\\])/g, "\\$1");

async function sendTelegram(text) {
  if (!TELEGRAM_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn("Telegram não configurado, pulando notificação");
    return;
  }
  const res = await fetch(
    `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: "MarkdownV2",
        disable_web_page_preview: true,
      }),
    }
  );
  if (!res.ok) {
    console.error("Erro Telegram:", res.status, await res.text());
  }
}

async function saveToSupabase(row) {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.warn("Supabase não configurado, pulando gravação");
    return;
  }
  const res = await fetch(`${SUPABASE_URL}/rest/v1/vendas`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      // on_conflict evita duplicata se a HeroSpark reenviar o mesmo evento
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify(row),
  });
  if (!res.ok) {
    console.error("Erro Supabase:", res.status, await res.text());
  }
}

/**
 * Envia a venda para a UTMify.
 *
 * Traduz o payload da HeroSpark para o schema da UTMify e posta com o token
 * da credencial de API. Serve para o caso em que a venda precisa ser reportada
 * pelo servidor — o pixel de navegador não dá conta do Pix, porque a
 * confirmação chega com a compradora já fora da página.
 *
 * DESLIGADA POR PADRÃO desde 08/09/2026. A HeroSpark passou a ter integração
 * nativa com a UTMify (painel > Integrações > Utmify, gatilho "Pagamento
 * confirmado"), e ela já posta a venda direto. Se esta function postar também,
 * o mesmo pedido entra duas vezes e o faturamento no painel dobra.
 *
 * Só ligue isto — com UTMIFY_ENVIO=1 — se a integração nativa da HeroSpark for
 * desativada ou parar de entregar. Ter o token sozinho não basta, de propósito.
 */
const UTMIFY_TOKEN = process.env.UTMIFY_API_TOKEN;
const UTMIFY_ENVIO_LIGADO = process.env.UTMIFY_ENVIO === "1";

// "YYYY-MM-DD HH:MM:SS" em UTC — formato exigido pela UTMify.
function dataUtmify(valor) {
  const d = valor ? new Date(valor) : new Date();
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString().slice(0, 19).replace("T", " ");
}

function statusUtmify(status) {
  const s = String(status || "").toLowerCase();
  if (/aprov|paid|approved|complet/.test(s)) return "paid";
  if (/pend|aguard|waiting|generated/.test(s)) return "waiting_payment";
  if (/refund|estorn|reembols/.test(s)) return "refunded";
  if (/chargeback|chargedback/.test(s)) return "chargedback";
  if (/recus|refus|declin|cancel/.test(s)) return "refused";
  return "waiting_payment";
}

function metodoUtmify(metodo) {
  const m = String(metodo || "").toLowerCase();
  if (/pix/.test(m)) return "pix";
  if (/boleto|billet/.test(m)) return "billet";
  return "credit_card";
}

const centavos = (v) => Math.round(Number(v || 0) * 100);

async function sendToUtmify(v) {
  if (!UTMIFY_ENVIO_LIGADO) {
    console.log(
      "UTMify: envio desligado (a integração nativa da HeroSpark é quem posta). " +
        "Para assumir aqui, defina UTMIFY_ENVIO=1."
    );
    return;
  }
  if (!UTMIFY_TOKEN) {
    console.warn("UTMify não configurada (falta UTMIFY_API_TOKEN), pulando");
    return;
  }

  const status = statusUtmify(v.status);
  // Prefere os centavos que a HeroSpark já manda inteiros; só converte de
  // reais quando eles não vierem (payload nativo antigo).
  const total = v.total_centavos ?? centavos(v.valor);
  const taxa = v.taxa_centavos ?? centavos(v.taxa);

  const corpo = {
    orderId: String(v.venda_id || `hs-${Date.now()}`),
    platform: "HeroSpark",
    paymentMethod: metodoUtmify(v.metodo),
    status,
    createdAt: dataUtmify(v.criado_originalmente_em),
    approvedDate: status === "paid" ? dataUtmify(v.aprovado_em) : null,
    refundedAt: status === "refunded" ? dataUtmify(v.estornado_em) : null,
    customer: {
      name: v.nome || "Não informado",
      email: v.email || "nao-informado@exemplo.com",
      phone: v.telefone || null,
      document: v.documento || null,
      country: "BR",
      ip: v.ip || null,
    },
    products: [
      {
        id: String(v.venda_id || "produto"),
        name: v.produto,
        planId: null,
        planName: null,
        quantity: 1,
        priceInCents: total,
      },
    ],
    // É por aqui que a UTMify liga a venda ao anúncio. Os UTMs chegam porque
    // lib/checkout.ts os propaga da landing page até o checkout da HeroSpark.
    trackingParameters: {
      src: v.src,
      sck: null,
      utm_source: v.utm_source,
      utm_campaign: v.utm_campaign,
      utm_medium: v.utm_medium,
      utm_content: v.utm_content,
      utm_term: v.utm_term,
    },
    commission: {
      totalPriceInCents: total,
      gatewayFeeInCents: taxa,
      userCommissionInCents: total - taxa,
    },
    isTest: false,
  };

  const res = await fetch("https://api.utmify.com.br/api-credentials/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-token": UTMIFY_TOKEN,
    },
    body: JSON.stringify(corpo),
  });

  if (!res.ok) {
    // Logar o corpo é o que permite ajustar o schema sem adivinhar:
    // a UTMify responde dizendo qual campo recusou.
    console.error("Erro UTMify:", res.status, await res.text());
    console.error("Corpo enviado:", JSON.stringify(corpo));
  } else {
    console.log("UTMify OK:", corpo.orderId, corpo.status);
  }
}

// Converte para número aceitando "3490", 3490, "34,90", "R$ 34,90" e vazio.
// A vírgula importa: Number("34,90") é NaN, e isso zeraria o registro.
function num(v) {
  if (v === null || v === undefined || v === "") return null;
  if (typeof v === "number") return Number.isFinite(v) ? v : null;
  const limpo = String(v)
    .replace(/[R$\s]/gi, "")
    .replace(/\.(?=\d{3}\b)/g, "") // separador de milhar
    .replace(",", ".");
  const n = Number(limpo);
  return Number.isFinite(n) ? n : null;
}

/**
 * Normaliza o payload da HeroSpark.
 *
 * Os nomes vêm do webhook personalizado (Automações > Gerar um Webhook), cuja
 * lista de variáveis foi conferida no painel em 09/09/2026. Dois detalhes que
 * já causaram erro:
 *
 * - NÃO existe `order_id`. O identificador bom é `item_id`, que a HeroSpark
 *   documenta como "mesmo ID na confirmação e no estorno" — é ele que permite
 *   casar um reembolso com a venda original.
 * - `offer_price`, `payment_value`, `net_value_cents` e `purchase_total_value`
 *   vêm todos EM CENTAVOS. Tratar como reais multiplicaria o valor por 100.
 *
 * Os fallbacks em cadeia continuam para o caso de o payload nativo (não o
 * personalizado) chegar aqui algum dia.
 */
function parsePayload(body) {
  const p = body || {};
  const buyer = p.buyer || p.customer || p.cliente || {};
  const product = p.product || p.produto || {};

  // Centavos são inteiros: sem vírgula, sem locale, sem arredondamento.
  const pagoCent = num(p.payment_value) ?? num(p.offer_price);
  const liquidoCent = num(p.net_value_cents);
  const totalCent = num(p.purchase_total_value) ?? pagoCent;

  // A HeroSpark não expõe a taxa direto; ela é a diferença entre o que o
  // comprador pagou e o que caiu para você.
  //
  // Guarda de unidade: o líquido nunca pode passar do bruto. Quando passa, os
  // dois campos vieram em unidades diferentes e a conta produziria lixo — o
  // payload de teste da HeroSpark manda payment_value=1111 com
  // net_value_cents=111100, o que dava uma taxa de -R$ 1.099,89. Nesse caso
  // preferimos não afirmar nada a afirmar errado.
  const unidadeCoerente =
    totalCent !== null && liquidoCent !== null && liquidoCent <= totalCent;

  if (totalCent !== null && liquidoCent !== null && !unidadeCoerente) {
    console.warn(
      `Valores incoerentes: liquido ${liquidoCent} > bruto ${totalCent} (centavos). ` +
        "Taxa e valor líquido descartados neste evento."
    );
  }

  const taxaCent = unidadeCoerente ? totalCent - liquidoCent : null;
  const liquidoConfiavel = unidadeCoerente ? liquidoCent : null;

  const emReais = (c) => (c === null ? null : c / 100);

  return {
    venda_id:
      p.item_id || p.payment_id || p.id || p.order_id || p.transaction_id || null,
    status: p.payment_status || p.status || p.situacao || "desconhecido",
    produto: product.name || product.title || p.product_name || "Devocional",
    oferta: p.offer_title || null,
    oferta_id: p.offer_id || null,
    valor: emReais(pagoCent) ?? num(p.amount) ?? num(p.valor) ?? 0,
    valor_liquido: emReais(liquidoConfiavel),
    valor_total: emReais(totalCent),
    valor_centavos: pagoCent,
    liquido_centavos: liquidoConfiavel,
    total_centavos: totalCent,
    metodo: p.payment_method || p.metodo_pagamento || null,
    nome: p.buyer_name || buyer.name || buyer.nome || null,
    email: p.buyer_email || buyer.email || null,
    telefone: p.buyer_phone_raw || p.buyer_phone || buyer.phone || null,
    // `upsell` chega como a string "true"/"false" do Liquid, não como boolean.
    upsell: String(p.upsell).toLowerCase() === "true",
    order_bump: Boolean(p.order_bump || p.bump || p.has_bump),
    // UTMs: chegam aqui porque lib/checkout.ts as propaga da LP até o checkout.
    utm_source: p.utm_source || p.cart_src || null,
    utm_campaign: p.utm_campaign || null,
    utm_medium: p.utm_medium || null,
    utm_content: p.utm_content || null, // use isso pra identificar o anúncio
    utm_term: p.utm_term || null,
    utm_id: p.utm_id || null,
    src: p.cart_src || null,
    documento: p.buyer_document_id || buyer.document || buyer.cpf || null,
    ip: buyer.ip || p.ip || null,
    criado_originalmente_em: p.created_at || p.createdAt || null,
    aprovado_em: p.payment_date || p.approved_at || p.paid_at || null,
    estornado_em: p.refunded_at || null,
    taxa: emReais(taxaCent) ?? 0,
    taxa_centavos: taxaCent,
    raw: p,
    criado_em: new Date().toISOString(),
  };
}

function montarMensagem(v) {
  const aprovado = /aprov|paid|approved|complet/i.test(v.status);
  const pendente = /pend|aguard|waiting|generated/i.test(v.status);

  const icone = aprovado ? "✅" : pendente ? "⏳" : "ℹ️";
  const titulo = aprovado
    ? "VENDA APROVADA"
    : pendente
    ? "PIX GERADO (aguardando)"
    : `STATUS: ${v.status}`;

  const linhas = [
    `${icone} *${esc(titulo)}*`,
    ``,
    `📦 ${esc(v.produto)}`,
    `💰 ${esc(BRL(v.valor))}${v.order_bump ? esc(" (com order bump)") : ""}`,
    v.nome ? `👤 ${esc(v.nome)}` : null,
    v.email ? `📧 ${esc(v.email)}` : null,
    v.telefone ? `📱 ${esc(v.telefone)}` : null,
    v.utm_content ? `🎯 Anúncio: ${esc(v.utm_content)}` : null,
    ``,
    `🕐 ${esc(
      new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })
    )}`,
  ].filter(Boolean);

  return linhas.join("\n");
}

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  // Autenticação simples: ?secret=xxx na URL do webhook
  const secret = event.queryStringParameters?.secret;
  if (WEBHOOK_SECRET && secret !== WEBHOOK_SECRET) {
    return { statusCode: 401, body: "Unauthorized" };
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, body: "JSON inválido" };
  }

  // Log do payload cru: essencial nas primeiras execuções pra você
  // descobrir os nomes reais dos campos e ajustar parsePayload().
  console.log("PAYLOAD HEROSPARK:", JSON.stringify(body));

  const venda = parsePayload(body);

  try {
    // allSettled: uma falha na UTMify não pode derrubar a notificação do
    // Telegram nem a gravação no Supabase, e vice-versa.
    const r = await Promise.allSettled([
      saveToSupabase(venda),
      sendTelegram(montarMensagem(venda)),
      sendToUtmify(venda),
    ]);
    r.forEach((x, i) => {
      if (x.status === "rejected") {
        console.error(`Etapa ${["supabase", "telegram", "utmify"][i]} falhou:`, x.reason);
      }
    });
  } catch (err) {
    console.error("Erro no processamento:", err);
    // Retorna 200 mesmo assim: se retornar erro, a HeroSpark pode
    // ficar reenviando o mesmo evento e gerar duplicata.
  }

  return { statusCode: 200, body: JSON.stringify({ ok: true }) };
}
