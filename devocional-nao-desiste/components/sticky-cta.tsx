import { CHECKOUT_URL } from "@/components/cta-button"

export function StickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-sm md:hidden">
      <a
        href={CHECKOUT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center rounded-full bg-cta px-5 py-3.5 text-center text-sm font-extrabold uppercase leading-tight tracking-wide text-cta-foreground shadow-lg shadow-cta/30"
      >
        Quero renovar minhas forças — R$ 34,90
      </a>
    </div>
  )
}
