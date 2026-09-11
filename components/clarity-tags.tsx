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

export function ClarityTags() {
  useEffect(() => {
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
