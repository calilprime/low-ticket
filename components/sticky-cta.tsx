"use client"

import { useEffect, useState } from "react"

import { CHECKOUT_URL, buildCheckoutUrl, goToCheckout } from "@/lib/checkout"

export function StickyCta() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const oferta = document.getElementById("oferta")
      const passouDoHero = window.scrollY > window.innerHeight * 0.6
      // Some a barra quando a própria seção de oferta já está na tela.
      const ofertaVisivel = oferta ? oferta.getBoundingClientRect().top < window.innerHeight : false
      setVisible(passouDoHero && !ofertaVisivel)
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-8px_24px_rgba(0,0,0,0.08)] backdrop-blur transition-all duration-300 md:hidden ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <div className="mx-auto flex max-w-md flex-col items-center gap-1.5">
        {/* Âncora, pelo mesmo motivo do CtaButton: o href precisa valer antes
            da hidratação. Esta barra é a única CTA visível durante boa parte
            da rolagem no mobile. */}
        <a
          href={CHECKOUT_URL}
          onClick={(e) => {
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
            e.preventDefault()
            goToCheckout()
          }}
          ref={(el) => {
            if (el) el.href = buildCheckoutUrl()
          }}
          tabIndex={visible ? 0 : -1}
          className="block w-full cursor-pointer rounded-full bg-cta px-5 py-3.5 text-center text-sm font-extrabold uppercase leading-snug tracking-wide text-cta-foreground no-underline shadow-lg shadow-cta/30 active:translate-y-px"
        >
          Quero começar o Dia 1 — R$ 34,90
        </a>
        <p className="text-xs text-muted-foreground">
          Acesso imediato no e-mail • 7 dias de garantia
        </p>
      </div>
    </div>
  )
}
