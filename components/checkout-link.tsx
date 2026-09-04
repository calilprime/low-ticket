'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { CHECKOUT_URL, buildCheckoutUrl } from '@/lib/checkout'

/**
 * CTA de checkout.
 *
 * Regra do projeto: TODO CTA é uma tag <a> com href absoluto, renderizada já
 * no HTML do servidor. Nada de <button onClick={...}> e nada de `asChild` —
 * o Button daqui é do @base-ui/react, que não entende `asChild` e acabaria
 * aninhando <a> dentro de <button>. Foi assim que o botão virou "só texto"
 * e ninguém conseguiu comprar.
 *
 * O href já sai correto do servidor. Depois da hidratação ele é reescrito
 * para carregar os UTMs do anúncio. Se o JS falhar, o link continua válido.
 */

type Props = {
  children: React.ReactNode
  className?: string
  /** Linha pequena abaixo do rótulo, dentro do próprio botão. */
  sub?: string
  /** `dark` = botão dourado sobre o card oliva. */
  tone?: 'primary' | 'gold'
}

export function CheckoutLink({ children, className, sub, tone = 'primary' }: Props) {
  const [href, setHref] = useState(CHECKOUT_URL)

  useEffect(() => {
    setHref(buildCheckoutUrl())
  }, [])

  function handleClick() {
    const w = window as any
    if (typeof w.fbq === 'function') {
      w.fbq('track', 'InitiateCheckout', {
        value: 34.9,
        currency: 'BRL',
        content_name: 'Devocional da Mãe Serena',
      })
    }
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className={cn(
        'flex w-full max-w-md flex-col items-center justify-center gap-1 rounded-full px-6 py-5',
        'text-center text-base leading-snug font-bold tracking-wide uppercase',
        'transition-transform hover:scale-[1.02] focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none',
        'sm:text-lg',
        tone === 'gold'
          ? 'bg-gold text-olive shadow-xl shadow-black/25'
          : 'bg-primary text-primary-foreground shadow-xl shadow-primary/25',
        className,
      )}
    >
      <span className="text-balance">{children}</span>
      {sub ? (
        <span className="text-xs font-medium tracking-normal normal-case opacity-90">
          {sub}
        </span>
      ) : null}
    </a>
  )
}
