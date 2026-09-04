"use client"

import { CHECKOUT_URL, buildCheckoutUrl, goToCheckout } from "@/lib/checkout"
import { cn } from "@/lib/utils"

/**
 * Âncora, não <button>.
 *
 * Antes isto era um <button onClick>, e o clique só funcionava depois que o
 * React hidratava — o HTML do servidor já pintava a página e a compradora
 * conseguia tocar num botão que ainda não fazia nada. Numa rede móvel lenta
 * essa janela morta dura alguns segundos, bem no ponto de maior intenção.
 *
 * Agora o href vale desde o primeiro byte: sem JS, o link leva ao checkout
 * (a HeroSpark dispara o InitiateCheckout dela mesma no load). Com JS, o
 * onClick assume, acrescenta os UTMs do anúncio e dispara o evento daqui.
 */
export function CtaButton({
  children,
  price = "Apenas R$ 34,90",
  className,
  pulse = true,
}: {
  children: React.ReactNode
  price?: string | null
  className?: string
  pulse?: boolean
}) {
  return (
    <a
      href={CHECKOUT_URL}
      onClick={(e) => {
        // Deixa passar o comportamento nativo de "abrir em nova aba".
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
        e.preventDefault()
        goToCheckout()
      }}
      // Enriquece o href com os UTMs assim que o componente monta, para que
      // até um "abrir em nova aba" carregue a atribuição.
      ref={(el) => {
        if (el) el.href = buildCheckoutUrl()
      }}
      className={cn(
        "flex w-full max-w-lg cursor-pointer flex-col items-center justify-center rounded-full bg-cta px-5 py-4 text-center text-[0.95rem] font-extrabold uppercase leading-tight tracking-wide text-cta-foreground no-underline shadow-xl shadow-cta/30 transition-transform hover:scale-[1.02] hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cta active:translate-y-px sm:text-lg",
        pulse && "animate-cta-pulse",
        className,
      )}
    >
      <span className="text-balance">{children}</span>
      {price ? (
        <span className="mt-1 text-xs font-bold normal-case tracking-normal opacity-95 sm:text-sm">({price})</span>
      ) : null}
    </a>
  )
}
