"use client"

import { Button } from "@/components/ui/button"
import { ShieldCheck, Check, Printer } from "lucide-react"
import { goToCheckout } from "@/lib/checkout"

const included = [
  "Os 9 Dias de Oração pelo Coração do Seu Filho",
  "Bônus 1: Cartão de Entrega",
  "Bônus 2: Checklist dos 9 Dias",
  "Bônus 3: Quadro de Orações Respondidas",
]

export function OfferSection() {
  return (
    <section id="oferta" className="bg-background px-5 py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="overflow-hidden rounded-3xl bg-olive text-olive-foreground shadow-2xl shadow-olive/20">
          <div className="px-6 py-10 text-center md:px-12 md:py-14">
            <h2 className="text-balance font-serif text-2xl font-bold sm:text-3xl">
              Comece hoje o Dia 1
            </h2>

            <ul className="mx-auto mt-8 grid max-w-md gap-3 text-left">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-olive-foreground/90">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mx-auto mt-10 flex max-w-md items-center justify-center gap-2 rounded-2xl border border-gold/40 bg-gold/10 px-5 py-3">
              <Printer className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
              <p className="text-sm font-semibold text-gold">
                Arquivo digital para imprimir em casa
              </p>
            </div>

            <div className="mt-6 flex flex-col items-center">
              <span className="font-serif text-5xl font-bold text-gold md:text-6xl">R$ 34,90</span>
              <span className="mt-1 text-base text-olive-foreground/70">pagamento único</span>
            </div>

            <Button
              size="lg"
              onClick={goToCheckout}
              className="mt-8 h-auto w-full max-w-md rounded-full px-8 py-5 text-base font-bold uppercase leading-snug tracking-wide shadow-xl shadow-black/25 transition-transform hover:scale-[1.02] sm:text-lg"
            >
              Quero começar o Dia 1 hoje
            </Button>

            <div className="mx-auto mt-8 flex max-w-md items-start gap-4 rounded-2xl bg-olive-foreground/5 p-5 text-left ring-1 ring-olive-foreground/10">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold">
                <ShieldCheck className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <p className="font-serif text-base font-semibold">Garantia de 7 dias</p>
                <p className="mt-1 text-sm leading-relaxed text-olive-foreground/80">
                  Você tem 7 dias para pedir o reembolso integral, sem precisar justificar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
