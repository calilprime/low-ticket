'use client'

export const CHECKOUT_URL =
  'https://pay.herospark.com/devocional-da-mae-que-nao-desiste-538247'

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
export function buildCheckoutUrl(search?: string) {
  const params = new URLSearchParams(
    search ?? (typeof window === 'undefined' ? '' : window.location.search),
  )
  const url = new URL(CHECKOUT_URL)

  UTM_KEYS.forEach((k) => {
    const v = params.get(k)
    if (v) url.searchParams.set(k, v)
  })

  return url.toString()
}

/**
 * @param origin qual botao originou o clique ('hero', 'oferta', 'sticky').
 *   Vira tag no Clarity, para comparar qual CTA da pagina realmente leva ao
 *   checkout — o Meta so reporta o total.
 */
export function goToCheckout(origin = 'cta') {
  if (typeof window === 'undefined') return
  if (redirecting) return
  redirecting = true

  const w = window as any

  // Clarity: o evento vira Smart Event no painel (recorte de quem clicou vs
  // quem nao clicou), e o upgrade prioriza a gravacao desta sessao caso o
  // projeto entre em amostragem. Ambos sao no-op se o script nao carregou.
  if (typeof w.clarity === 'function') {
    w.clarity('set', 'cta_origin', origin)
    w.clarity('event', 'cta_click')
    w.clarity('upgrade', 'cta_click')
  }

  if (typeof w.fbq === 'function') {
    w.fbq('track', 'InitiateCheckout', {
      value: 34.9,
      currency: 'BRL',
      content_name: 'Devocional da Mãe que Não Desiste',
    })
  }

  window.location.href = buildCheckoutUrl()
}