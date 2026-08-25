import Image from "next/image"
import { Clock, BookOpen, Infinity as InfinityIcon } from "lucide-react"

import { CtaButton } from "@/components/cta-button"

const badges = [
  { icon: Clock, label: "5 Minutos por Dia" },
  { icon: BookOpen, label: "100% Bíblico" },
  { icon: InfinityIcon, label: "Acesso Vitalício" },
]

export function HeroSection() {
  return (
    <section className="bg-background px-5 pb-14 pt-8 md:pb-24 md:pt-12">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-14">
          <div className="w-full min-w-0 flex-1 text-center lg:text-left">
            <h1 className="text-balance font-serif text-[1.75rem] font-bold leading-[1.15] text-foreground sm:text-4xl md:text-5xl">
              Para Toda Mãe e Mulher que Está Exausta, Sentindo que Não Vai Dar Conta e Perto de Desistir.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0">
              Em apenas 9 dias, renovar suas forças, acalmar sua mente ansiosa e resgatar a paz no seu lar leva apenas{" "}
              <strong className="font-semibold text-foreground">5 minutos por dia</strong>. Sem leituras longas, sem
              culpa.
            </p>

            {/* Mockup do produto — aparece antes do CTA no mobile, ao lado no desktop */}
            <div className="mt-10 lg:hidden">
              <ProductShowcase priority />
            </div>

            <div className="mt-10 flex flex-col items-center gap-3 lg:items-start">
              <CtaButton>Quero Renovar Minhas Forças Agora</CtaButton>
              <p className="text-sm font-medium text-muted-foreground">
                ⚡ Acesso imediato no e-mail • 🔒 Garantia de 7 dias
              </p>
            </div>
          </div>

          <div className="hidden w-full max-w-md flex-1 lg:block">
            <ProductShowcase />
          </div>
        </div>
      </div>
    </section>
  )
}

function ProductShowcase({ priority = false }: { priority?: boolean }) {
  return (
    <div className="mx-auto w-full max-w-md">
      <div className="relative rounded-3xl bg-gradient-to-b from-sand to-card p-4 shadow-2xl shadow-olive/15 ring-1 ring-gold/30">
        <Image
          src="/devocional-mockup.png"
          alt="Devocional Não Desiste em PDF com os 3 bônus exibidos em um tablet e em folhas impressas"
          width={640}
          height={640}
          priority={priority}
          sizes="(max-width: 1024px) 90vw, 420px"
          className="w-full rounded-2xl"
        />
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-4 py-1 text-[11px] font-bold uppercase tracking-wide text-primary-foreground shadow-lg">
          Devocional + 3 Bônus
        </span>
      </div>

      <ul className="mt-5 grid grid-cols-3 gap-2">
        {badges.map(({ icon: Icon, label }) => (
          <li
            key={label}
            className="flex flex-col items-center gap-1.5 rounded-2xl border border-gold/30 bg-gold/10 px-2 py-3 text-center"
          >
            <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
            <span className="text-[11px] font-bold leading-tight text-foreground sm:text-xs">{label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
