import { Check } from "lucide-react"

import { CtaButton } from "@/components/cta-button"

const stack = [
  { name: "Devocional Não Desiste (PDF — 9 Dias)", from: "R$ 97,00", main: true },
  { name: "Bônus 1: Planner Semanal da Família", from: "R$ 27,00" },
  { name: "Bônus 2: Checklist do Lar em Paz", from: "R$ 19,00" },
  { name: "Bônus 3: Cartão de Entrega a Deus", from: "R$ 17,00" },
]

export function OfferSection() {
  return (
    <section id="oferta" className="bg-background px-5 py-16 md:py-24">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-balance text-center font-serif text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
          Tudo o que você recebe hoje por menos que um lanche
        </h2>

        <div className="mt-10 overflow-hidden rounded-[2rem] bg-olive text-olive-foreground shadow-2xl shadow-olive/25">
          <div className="bg-gold px-6 py-3 text-center">
            <p className="text-xs font-extrabold uppercase tracking-wide text-[oklch(0.25_0.02_60)] sm:text-sm">
              ⚠️ Oferta de lançamento — liberação imediata
            </p>
          </div>

          <div className="px-5 py-9 sm:px-8 md:px-12 md:py-12">
            <ul className="grid gap-3">
              {stack.map(({ name, from, main }) => (
                <li
                  key={name}
                  className="flex items-center justify-between gap-4 rounded-2xl bg-olive-foreground/5 px-4 py-3.5 ring-1 ring-olive-foreground/10"
                >
                  <span className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-cta" aria-hidden="true" />
                    <span
                      className={`text-sm leading-snug sm:text-base ${main ? "font-bold" : "text-olive-foreground/90"}`}
                    >
                      {name}
                    </span>
                  </span>
                  <span className="shrink-0 text-right">
                    <span className="block text-xs text-olive-foreground/50 line-through">{from}</span>
                    <span className="block text-xs font-bold uppercase tracking-wide text-cta">Incluído</span>
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-9 text-center">
              <p className="text-sm text-olive-foreground/70">
                Valor real de tudo:{" "}
                <span className="font-semibold line-through decoration-2">R$ 160,00</span>
              </p>
              <p className="mt-3 text-sm font-medium uppercase tracking-wide text-gold">Hoje você leva por</p>
              <p className="mt-1 font-serif text-6xl font-bold leading-none text-gold sm:text-7xl">R$ 34,90</p>
              <p className="mt-3 text-sm text-olive-foreground/80">à vista no PIX ou no cartão</p>
            </div>

            <div className="mt-8 flex flex-col items-center gap-3">
              <CtaButton>Quero Renovar Minhas Forças Agora</CtaButton>
              <p className="text-xs text-olive-foreground/70">
                Compra 100% segura • Entrega automática no seu e-mail
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
