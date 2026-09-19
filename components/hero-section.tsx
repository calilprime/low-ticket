import Image from "next/image"
import { Clock, BookOpen, Mail } from "lucide-react"

import { CtaButton } from "@/components/cta-button"

const badges = [
  { icon: Clock, label: "2 a 10 Minutos por Dia" },
  { icon: BookOpen, label: "100% Bíblico" },
  { icon: Mail, label: "Chega no E-mail" },
]

export function HeroSection() {
  return (
    <section className="bg-background bg-[radial-gradient(120%_60%_at_50%_0%,color-mix(in_oklab,var(--gold)_13%,transparent),transparent_70%)] px-5 pb-14 pt-8 md:pb-24 md:pt-12">
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

            <PlanosTopo />

            <p className="mt-4 text-sm font-semibold text-muted-foreground">
              ⚡ Acesso imediato no e-mail • 🔒 Garantia de 7 dias
            </p>

            {/* O depoimento que fala de direção, não de desfecho: a copy dos
                anúncios abre com "orar não é pedir que ele volte", e a primeira
                tela não pode contradizer o que trouxe a mãe até aqui. O relato
                de reaproximação está na seção de oferta, depois do preço. */}
            {/* Depoimento real de compradora (WhatsApp, 18/09, autorizado). Fala
                do alívio, não do filho — por isso pode ficar na primeira tela. */}
            <figure className="mt-8 border-l-[3px] border-gold py-0.5 pl-4 text-left">
              <blockquote className="text-sm italic leading-relaxed text-foreground sm:text-base">
                &ldquo;<span className="grifo">Foi o único material que não me fez sentir mais culpada</span> do que eu
                já tava. Quando li no começo que o devocional serve para aliviar, e não para colocar mais cobrança
                na lista da mãe, eu chorei.&rdquo;
              </blockquote>
              <figcaption className="mt-2 text-xs text-muted-foreground">— Joana S., compradora</figcaption>
            </figure>
          </div>

          <div className="hidden w-full max-w-md flex-1 lg:block">
            <ProductShowcase />
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * Os dois planos na primeira tela.
 *
 * O preço ficava aqui desde a LP v2 (a mãe descobria R$ 34,90 só no checkout).
 * Com dois planos (15/09), um botão único na primeira tela levava todo mundo ao
 * Básico sem ela ver que o Completo existe. Agora os dois aparecem juntos: o
 * Completo primeiro, com "Recomendado", e o Básico com botão secundário.
 *
 * "Recomendado", e não "mais escolhido": o Completo ainda não tem venda, e
 * afirmar preferência que não existe é o tipo de prova falsa que a página evita.
 */
function PlanosTopo() {
  return (
    <div className="mx-auto mt-9 grid max-w-md gap-3 text-center lg:mx-0">
      <div className="relative rounded-[1.25rem] border-2 border-cta bg-card px-4 pb-4 pt-6 shadow-[0_14px_30px_-18px_color-mix(in_oklab,var(--cta)_70%,transparent)]">
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-cta px-3.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wide text-cta-foreground">
          Recomendado
        </span>
        <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-muted-foreground">Devocional + 3 Bônus</p>
        <p className="mt-2 font-serif text-[2.15rem] font-extrabold leading-none tabular-nums text-olive">
          R$&nbsp;47,90 <span className="text-base font-semibold text-muted-foreground">uma vez</span>
        </p>
        <p className="mt-2 text-[0.8rem] leading-relaxed text-muted-foreground">
          Os 9 dias + <strong className="font-bold text-foreground">Checklist, Quadro de Orações Respondidas e Cartão de Entrega</strong>
        </p>
        <CtaButton plano="completo" price="R$ 47,90 — com os 3 bônus" origin="hero_completo" className="mt-3.5 max-w-none">
          Quero Começar com os Bônus
        </CtaButton>
      </div>

      <div className="rounded-[1.25rem] border border-gold/45 bg-card px-4 pb-4 pt-4">
        <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-muted-foreground">Só o Devocional</p>
        <p className="mt-2 font-serif text-[1.7rem] font-extrabold leading-none tabular-nums text-olive">
          R$&nbsp;34,90 <span className="text-sm font-semibold text-muted-foreground">uma vez</span>
        </p>
        <p className="mt-1.5 text-[0.8rem] font-bold text-primary">R$ 3,87 por cada um dos 9 dias</p>
        <CtaButton
          plano="basico"
          price="R$ 34,90 — pagamento único"
          origin="hero_basico"
          pulse={false}
          className="mt-3 max-w-none border-2 border-cta bg-transparent py-3 text-[0.85rem] text-cta shadow-none sm:text-base"
        >
          Quero Só o Devocional
        </CtaButton>
      </div>
    </div>
  )
}

function ProductShowcase({ priority = false }: { priority?: boolean }) {
  return (
    <div className="mx-auto w-full max-w-md">
      <div className="relative rounded-3xl bg-gradient-to-b from-sand to-card p-3 shadow-2xl shadow-olive/15 ring-1 ring-gold/30">
        {/* WebP de 640px (40 KB). O PNG original tinha 1024x1024 e 1,8 MB —
            80% do peso da pagina inteira — e era servido cru: este projeto
            roda com images.unoptimized, entao o next/image nao redimensiona
            nada em build. O arquivo em public/ e o que a compradora baixa.
            A v2 trocou a capa anterior, que trazia "Devocional Ma Mae que Nao
            Desiste" e uma autora inventada impressos na propria imagem.

            O 1:1 esticava no celular e empurrava preco e botao para fora da
            primeira tela. O corte para 4:3 mantem o livro e a Biblia e devolve
            ~25% de altura — que e exatamente o que o bloco de preco ocupa. */}
        <Image
          src="/devocional-mockup-v2.webp"
          alt="O Devocional da Mãe que Não Desiste sobre uma mesa de madeira, ao lado de uma xícara de café e uma Bíblia aberta"
          width={640}
          height={480}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          sizes="(max-width: 1024px) 90vw, 420px"
          className="aspect-[4/3] w-full rounded-2xl object-cover object-[center_46%]"
        />
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-4 py-1 text-[11px] font-bold uppercase tracking-wide text-primary-foreground shadow-lg">
          Bônus disponíveis
        </span>
        <span className="absolute -bottom-[1.1rem] -right-1.5 rotate-3 rounded-full bg-gold px-3 py-1 font-hand text-[1.05rem] font-bold text-olive shadow-[0_8px_18px_-8px_rgba(0,0,0,0.4)]">
          chega em 2 minutos
        </span>
      </div>

      <ul className="mt-6 grid grid-cols-3 gap-2">
        {badges.map(({ icon: Icon, label }) => (
          <li
            key={label}
            className="flex flex-col items-center gap-1.5 rounded-2xl border border-gold/35 bg-gold/12 px-2 py-3 text-center"
          >
            <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
            <span className="text-[11px] font-bold leading-tight text-foreground sm:text-xs">{label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
