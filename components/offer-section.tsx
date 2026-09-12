import { Check } from "lucide-react"

import { CtaButton } from "@/components/cta-button"

/**
 * Os três bônus são os inserts das páginas 13, 14 e 15 do próprio PDF.
 * A versão anterior desta lista trazia o Planner Semanal da Família e o
 * Checklist do Lar em Paz — que são os bônus do Devocional da Mãe Serena,
 * outro produto. Quem comprava aqui recebia três coisas diferentes das que
 * a página tinha prometido. Conferido contra Devocional-da-Mae-que-Nao-Desiste.pdf.
 *
 * Os preços riscados saíram. Eram R$ 97,00 / R$ 27,00 / R$ 19,00 / R$ 17,00 e
 * um "valor real de tudo: R$ 160,00" — e nenhum destes quatro itens jamais foi
 * vendido avulso por esses valores. Além de ser âncora inventada, ela empurrava
 * na direção contrária da que a página precisa: R$ 160 riscado afirma que o
 * material vale caro, quando o trabalho aqui é fazer R$ 34,90 parecer pequeno.
 */
const stack = [
  {
    name: "O Devocional da Mãe que Não Desiste",
    desc: "Os 9 dias completos, em PDF para ler no celular ou imprimir.",
    main: true,
  },
  {
    name: "Bônus 1: Checklist dos 9 Dias",
    desc: "Para imprimir e marcar cada dia concluído, com um espaço para anotar o seu horário fixo de oração. Se falhar um dia, você continua de onde parou — não recomeça.",
  },
  {
    name: "Bônus 2: Quadro de Orações Respondidas",
    desc: "Onde você registra o que pediu e o que viu acontecer — inclusive as respostas pequenas, que a memória apaga.",
  },
  {
    name: "Bônus 3: Cartão de Entrega",
    desc: "Você escreve o nome dele, recorta, dobra e guarda. Um lugar concreto para deixar o que não cabe mais em você.",
  },
]

export function OfferSection() {
  return (
    <section id="oferta" className="bg-background px-5 py-16 md:py-24">
      <div className="mx-auto max-w-2xl">
        <div className="overflow-hidden rounded-[2rem] bg-olive bg-[radial-gradient(90%_45%_at_50%_0%,color-mix(in_oklab,var(--gold)_22%,transparent),transparent_65%)] text-olive-foreground shadow-2xl shadow-olive/25">
          <div className="bg-gold px-6 py-3 text-center">
            <p className="text-xs font-extrabold uppercase tracking-wide text-[oklch(0.25_0.02_60)] sm:text-sm">
              Pagamento único • Acesso vitalício
            </p>
          </div>

          <div className="px-5 py-9 sm:px-8 md:px-12 md:py-12">
            <h2 className="text-balance text-center font-serif text-2xl font-bold sm:text-3xl" data-reveal>
              Tudo o que chega no seu e-mail hoje
            </h2>

            <ul className="mt-8 grid gap-2.5" data-reveal>
              {stack.map(({ name, desc, main }) => (
                <li
                  key={name}
                  className={`flex items-start gap-3 rounded-2xl px-4 py-4 ring-1 ${
                    main
                      ? "bg-gold/20 ring-gold/55"
                      : "bg-olive-foreground/6 ring-olive-foreground/12"
                  }`}
                >
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-cta" aria-hidden="true" />
                  <span>
                    <span className="block text-sm font-bold leading-snug sm:text-base">{name}</span>
                    <span className="mt-1 block text-xs leading-relaxed text-olive-foreground/70 sm:text-sm">
                      {desc}
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-9 text-center" data-reveal>
              <p className="font-serif text-6xl font-bold leading-none tabular-nums text-gold [text-shadow:0_6px_22px_color-mix(in_oklab,var(--gold)_40%,transparent)] sm:text-7xl">
                R$ 34,90
              </p>
              <p className="mt-2.5 text-sm text-olive-foreground/80">
                pagamento único • PIX ou cartão • acesso vitalício
              </p>
              {/* Banalização honesta: divisão e permanência. Nenhum número aqui
                  vem de outro lugar que não o próprio preço. */}
              <p className="mt-4 border-t border-olive-foreground/16 pt-4 text-sm leading-relaxed text-olive-foreground/90">
                São <strong className="font-bold text-gold">R$ 3,87 por cada dia de oração</strong>. E o arquivo fica
                seu: daqui a um ano você imprime de novo, quantas vezes precisar.
              </p>
            </div>

            <p className="mt-7 text-center" data-reveal>
              <span className="balao balao-escuro">paga uma vez, usa a vida inteira</span>
            </p>

            <div className="mt-7 flex flex-col items-center gap-3">
              <CtaButton price="R$ 34,90 — pagamento único" origin="oferta">
                Quero Começar o Dia 1 Agora
              </CtaButton>
              <p className="text-xs text-olive-foreground/70">
                Compra 100% segura • Entrega automática no seu e-mail
              </p>
            </div>

            {/* O relato de reaproximação vive aqui, depois do preço — e não na
                primeira tela, onde contradiria a anti-promessa que a copy dos
                anúncios usa para trazer a mãe até a página. */}
            <figure className="mt-9 border-l-[3px] border-gold py-0.5 pl-4" data-reveal>
              <blockquote className="text-sm italic leading-relaxed sm:text-base">
                &ldquo;Meu filho de 16 anos mal falava comigo. No dia 4 eu chorei orando, e naquela semana ele me
                procurou para conversar pela primeira vez em meses.&rdquo;
              </blockquote>
              <figcaption className="mt-2 text-xs text-olive-foreground/70">
                — Juliana M., mãe de um adolescente, 48 anos
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}
