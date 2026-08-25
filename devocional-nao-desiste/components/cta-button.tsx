import { cn } from "@/lib/utils"

export const CHECKOUT_URL = "https://pay.herospark.com/devocional-da-mae-que-nao-desiste-538247"

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
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex w-full max-w-lg flex-col items-center justify-center rounded-full bg-cta px-5 py-4 text-center text-[0.95rem] font-extrabold uppercase leading-tight tracking-wide text-cta-foreground shadow-xl shadow-cta/30 transition-transform hover:scale-[1.02] hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cta active:translate-y-px sm:text-lg",
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
