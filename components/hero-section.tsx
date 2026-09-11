import Image from "next/image"
import { Clock, BookOpen, Mail } from "lucide-react"

import { CtaButton } from "@/components/cta-button"

const badges = [
  { icon: Clock, label: "Passos de 2 a 10 Minutos" },
  { icon: BookOpen, label: "100% Bíblico" },
  { icon: Mail, label: "Chega no E-mail (PDF)" },
]

export function HeroSection() {
  return (
    <section className="bg-background px-5 pb-14 pt-8 md:pb-24 md:pt-12">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-14">
          <div className="w-full min-w-0 flex-1 text-center lg:text-left">
            <h1 className="text-balance font-serif text-[1.75rem] font-bold leading-[1.15] text-foreground sm:text-4xl md:text-5xl">
              O Que Orar Quando Seu Filho Fecha a Porta e Se Afasta de Você?
            </h1>
            {/* Versao anterior abria com "clamar pela vida do seu filho", que em
                registro evangelico soa como filho em risco de morte — alarme que
                a oferta nao paga — e prometia "resgatar a paz na sua casa", um
                resultado que depende do filho e nao dela. O "2 a 10 minutos"
                saiu daqui porque ja esta no badge logo abaixo. */}
            <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0">
              Para a mãe que já não sabe o que orar pelo filho que se afastou. 9 dias,{" "}
              <strong className="font-semibold text-foreground">uma oração pronta por dia</strong>, sem brigar e sem
              se desesperar.
            </p>

            {/* Mockup do produto — antes do CTA no mobile, ao lado no desktop */}
            <div className="mt-10 lg:hidden">
              <ProductShowcase priority />
            </div>

            <div className="mt-10 flex flex-col items-center gap-3 lg:items-start">
              {/* Sem o preco: os anuncios ja trazem R$ 34,90 na copy, e repetir
                  no primeiro botao antecipa a objecao antes da oferta. O valor
                  continua na secao de oferta e na barra fixa. */}
              <CtaButton price={null} origin="hero">Quero Começar o Dia 1 Agora</CtaButton>
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
        {/* WebP de 640px (40 KB). O PNG original tinha 1024x1024 e 1,8 MB —
            80% do peso da pagina inteira — e era servido cru: este projeto
            roda com images.unoptimized, entao o next/image nao redimensiona
            nada em build. O arquivo em public/ e o que a compradora baixa.
            A v2 trocou a capa anterior, que trazia "Devocional Ma Mae que Nao
            Desiste" e uma autora inventada impressos na propria imagem. */}
        <Image
          src="/devocional-mockup-v2.webp"
          alt="O Devocional da Mãe que Não Desiste sobre uma mesa de madeira, ao lado de uma xícara de café e uma Bíblia aberta"
          width={640}
          height={640}
          priority={priority}
          loading={priority ? undefined : "lazy"}
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
