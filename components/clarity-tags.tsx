"use client"

import { useEffect } from "react"

/**
 * Marca a sessao do Clarity com os UTMs do anuncio.
 *
 * Sem isto o painel so responde "as pessoas nao descem"; com as tags da para
 * filtrar gravacao, heatmap e scroll depth por criativo — ou seja, descobrir
 * *de qual anuncio* vem quem nao desce. Custom tags nao tem limite de
 * quantidade nem custo.
 *
 * `window.clarity` ja existe como fila desde o snippet no layout (ele define
 * c[a] antes de baixar o tag), entao chamar aqui no mount e seguro mesmo que o
 * script ainda esteja carregando: a chamada fica enfileirada.
 *
 * A leitura e sempre de window.location.search, a mesma fonte que o
 * buildCheckoutUrl usa para a atribuicao da HeroSpark.
 */
const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
]

/**
 * Sonda de 15/09: o Gerenciador conta LPV e IC de Vestido e Jantar (anúncios
 * que apontam para /quiz), mas o banco do quiz quase não recebe sessão. Cada
 * visita de anúncio à LP vira uma linha em quiz_eventos com variante 'nd_lp'
 * (fora do painel do quiz). Lida com anuncios_quiz_v2(desde, 'nd_lp').
 * Se Vestido/Jantar — ou "(sem utm_content)" — aparecerem aqui, o tráfego das
 * imagens está caindo na LP. Remover quando a dúvida estiver resolvida.
 */
function uuid() {
  if (crypto.randomUUID) return crypto.randomUUID()
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16)
  })
}

function registrarVisitaDeAnuncio(params: URLSearchParams) {
  if (!params.get("fbclid") && !params.get("utm_source")) return
  try {
    if (sessionStorage.getItem("nd_lp_sessao")) return
    const sessao = uuid()
    sessionStorage.setItem("nd_lp_sessao", sessao)
    const chave = "sb_publishable_JqCQTveGtqP01owfv_1XOA_l3BSW63H"
    fetch("https://asjakwljvzjotycmgtwd.supabase.co/rest/v1/quiz_eventos", {
      method: "POST",
      headers: {
        apikey: chave,
        Authorization: `Bearer ${chave}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        sessao,
        etapa: "abertura",
        ordem: 0,
        variante: "nd_lp",
        utm_source: params.get("utm_source"),
        utm_campaign: params.get("utm_campaign"),
        utm_content: params.get("utm_content"),
        fbclid: params.get("fbclid"),
        referrer: document.referrer || null,
        user_agent: navigator.userAgent,
        is_dev: false,
        is_bot: /bot|crawl|spider|headless|lighthouse|facebookexternalhit/i.test(navigator.userAgent) || navigator.webdriver === true,
      }),
    }).catch(() => {})
  } catch {}
}

export function ClarityTags() {
  useEffect(() => {
    registrarVisitaDeAnuncio(new URLSearchParams(window.location.search))

    const clarity = (window as any).clarity
    if (typeof clarity !== "function") return

    const params = new URLSearchParams(window.location.search)

    UTM_KEYS.forEach((key) => {
      const value = params.get(key)
      if (value) clarity("set", key, value)
    })

    // Separa trafego pago de organico/direto sem precisar cruzar dimensao.
    clarity("set", "traffic", params.get("utm_source") ? "ads" : "direct")
  }, [])

  return null
}
