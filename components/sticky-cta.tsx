'use client'

import { useEffect, useState } from 'react'
import { CheckoutLink } from '@/components/checkout-link'

export function StickyCta() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const oferta = document.getElementById('oferta')
      const passouDoHero = window.scrollY > window.innerHeight * 0.6
      // Some a barra quando a própria seção de oferta já está na tela.
      const ofertaVisivel = oferta
        ? oferta.getBoundingClientRect().top < window.innerHeight
        : false
      setVisible(passouDoHero && !ofertaVisivel)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(0,0,0,0.08)] backdrop-blur transition-all duration-300 md:hidden ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-full opacity-0'
      }`}
    >
      <div className="mx-auto flex max-w-md flex-col items-center gap-1.5">
        <CheckoutLink className="px-5 py-4 text-sm sm:text-sm">
          Quero me tornar uma Mãe Serena
        </CheckoutLink>
        <p className="text-xs text-muted-foreground">
          Apenas <span className="font-semibold text-primary">R$ 34,90</span> • 7 dias de
          garantia
        </p>
      </div>
    </div>
  )
}
