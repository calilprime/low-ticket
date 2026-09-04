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

export function goToCheckout() {
  if (typeof window === 'undefined') return
  if (redirecting) return
  redirecting = true

  const w = window as any
  if (typeof w.fbq === 'function') {
    w.fbq('track', 'InitiateCheckout', {
      value: 34.9,
      currency: 'BRL',
      content_name: 'Devocional da Mãe que Não Desiste',
    })
  }

  window.location.href = buildCheckoutUrl()
}