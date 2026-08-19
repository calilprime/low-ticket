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

export function goToCheckout() {
  if (typeof window === 'undefined') return
  if (redirecting) return
  redirecting = true

  const params = new URLSearchParams(window.location.search)
  const url = new URL(CHECKOUT_URL)

  UTM_KEYS.forEach((k) => {
    const v = params.get(k)
    if (v) url.searchParams.set(k, v)
  })

  const w = window as any
  if (typeof w.fbq === 'function') {
    w.fbq('track', 'InitiateCheckout', {
      value: 34.9,
      currency: 'BRL',
      content_name: 'Devocional da Mãe que Não Desiste',
    })
  }

  window.location.href = url.toString()
}