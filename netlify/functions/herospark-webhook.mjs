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
 * A UTMify não tem integração nativa com a HeroSpark — ela não aparece na
 * lista de plataformas do painel de webhooks. O caminho suportado nesse caso
 * é a API de credenciais: esta função traduz o payload da HeroSpark para o
 * schema da UTMify e posta com o token da credencial.
 *
 * É isto que faz a venda no Pix ser contabilizada. O pixel de navegador não
 * consegue: no Pix a confirmação chega minutos depois, com a compradora já
 * fora da página, e o evento Purchase nunca dispara. Aqui quem reporta é o
 * servidor, quando a HeroSpark avisa que aprovou.
 */
const UTMIFY_TOKEN = process.env.UTMIFY_API_TOKEN;

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
  if (!UTMIFY_TOKEN) {
    console.warn("UTMify não configurada (falta UTMIFY_API_TOKEN), pulando");
    return;
  }

  const status = statusUtmify(v.status);
  const total = centavos(v.valor);
  const taxa = centavos(v.taxa);

  const corpo = {
    orderId: String(v.venda_id || `hs-${Date.now()}`),
    platform: "HeroSpark",
    paymentMethod: metodoUtmify(v.metodo),
    status,
    createdAt: dataUtmify(v.criado_originalmente_em),
    approvedDate: status === "paid" ? dataUtmify(v.aprovado_em) : null,
    refundedAt: status === "refunded" ? dataUtmify(null) : null,
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
      src: null,
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

// Normaliza o payload da HeroSpark. Os nomes de campo variam conforme o
// gatilho — por isso o fallback em cadeia. Ajuste depois de ver 1 payload real.
function parsePayload(body) {
  const p = body || {};
  const buyer = p.buyer || p.customer || p.cliente || {};
  const product = p.product || p.produto || {};

  return {
    venda_id: p.id || p.order_id || p.sale_id || p.transaction_id || null,
    status: p.status || p.payment_status || p.situacao || "desconhecido",
    produto: product.name || product.title || p.product_name || "Devocional",
    valor: p.amount || p.value || p.total || p.valor || 0,
    valor_liquido: p.net_amount || p.valor_liquido || null,
    metodo: p.payment_method || p.metodo_pagamento || null,
    nome: buyer.name || buyer.nome || p.buyer_name || null,
    email: buyer.email || p.buyer_email || null,
    telefone: buyer.phone || buyer.telefone || p.buyer_phone || null,
    order_bump: Boolean(p.order_bump || p.bump || p.has_bump),
    // UTMs: chegam aqui se você propagar da LP -> checkout
    utm_source: p.utm_source || p.src || null,
    utm_campaign: p.utm_campaign || null,
    utm_medium: p.utm_medium || null,
    utm_content: p.utm_content || null, // use isso pra identificar o anúncio
    utm_term: p.utm_term || null,
    documento: buyer.document || buyer.cpf || p.buyer_document || null,
    ip: buyer.ip || p.ip || null,
    criado_originalmente_em: p.created_at || p.createdAt || p.data_criacao || null,
    aprovado_em: p.approved_at || p.approvedAt || p.paid_at || null,
    taxa: p.fee || p.gateway_fee || p.taxa || 0,
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
