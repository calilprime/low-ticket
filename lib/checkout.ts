'use client'

/**
 * Dois planos desde 15/09. A oferta 538247, que era a única (R$ 34,90), virou
 * o Completo (R$ 47,90) na HeroSpark; o Básico é uma oferta nova (542722).
 * Os anúncios falam R$ 34,90, então todo botão sem plano explícito leva ao
 * Básico — só os botões do card Completo levam ao 538247.
 */
export type Plano = 'basico' | 'completo'

export const PLANOS = {
  basico: {
    url: 'https://pay.herospark.com/devocional-da-mae-que-nao-desiste-basico-542725',
    valor: 34.9,
    nome: 'Devocional da Mãe que Não Desiste [BÁSICO]',
  },
  completo: {
    url: 'https://pay.herospark.com/devocional-da-mae-que-nao-desiste-538247',
    valor: 47.9,
    nome: 'Devocional da Mãe que Não Desiste [COMPLETO]',
  },
} as const

const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'utm_id',
  'fbclid',
]

// Trava contra duplo clique / duplo disparo de InitiateCheckout.
let redirecting = false

/**
 * Monta a URL de checkout preservando os UTMs do anúncio.
 * Os UTMs precisam sobreviver até a HeroSpark: é o webhook dela que
 * alimenta o painel de vendas, e o agrupamento é por utm_content.
 */
export function buildCheckoutUrl(plano: Plano = 'basico', search?: string) {
  const params = new URLSearchParams(
    search ?? (typeof window === 'undefined' ? '' : window.location.search),
  )
  const url = new URL(PLANOS[plano].url)

  UTM_KEYS.forEach((k) => {
    const v = params.get(k)
    if (v) url.searchParams.set(k, v)
  })

  return url.toString()
}

/**
 * @param origin qual botao originou o clique ('hero', 'oferta_basico',
 *   'oferta_completo', 'sticky'). Vira tag no Clarity, para comparar qual CTA
 *   da pagina realmente leva ao checkout — o Meta so reporta o total.
 */
export function goToCheckout(origin = 'cta', plano: Plano = 'basico') {
  if (typeof window === 'undefined') return
  if (redirecting) return
  redirecting = true

  const w = window as any

  // Clarity: o evento vira Smart Event no painel (recorte de quem clicou vs
  // quem nao clicou), e o upgrade prioriza a gravacao desta sessao caso o
  // projeto entre em amostragem. Ambos sao no-op se o script nao carregou.
  if (typeof w.clarity === 'function') {
    w.clarity('set', 'cta_origin', origin)
    w.clarity('set', 'plano', plano)
    w.clarity('event', 'cta_click')
    w.clarity('upgrade', 'cta_click')
  }

  if (typeof w.fbq === 'function') {
    w.fbq('track', 'InitiateCheckout', {
      value: PLANOS[plano].valor,
      currency: 'BRL',
      content_name: PLANOS[plano].nome,
    })
  }

  window.location.href = buildCheckoutUrl(plano)
}
