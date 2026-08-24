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
    utm_content: p.utm_content || null, // use isso pra identificar o anúncio
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
    await Promise.all([
      saveToSupabase(venda),
      sendTelegram(montarMensagem(venda)),
    ]);
  } catch (err) {
    console.error("Erro no processamento:", err);
    // Retorna 200 mesmo assim: se retornar erro, a HeroSpark pode
    // ficar reenviando o mesmo evento e gerar duplicata.
  }

  return { statusCode: 200, body: JSON.stringify({ ok: true }) };
}
