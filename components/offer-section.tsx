import { Check, Gift } from "lucide-react"

import { CtaButton } from "@/components/cta-button"

/**
 * Dois planos desde 15/09.
 *
 * Completo (R$ 47,90): o PDF de 16 páginas, com os três inserts das páginas
 * 13, 14 e 15. Conferido contra Devocional-da-Mae-que-Nao-Desiste.pdf — a
 * versão antiga desta lista trazia os bônus do Mãe Serena, outro produto.
 * Básico (R$ 34,90): o PDF de 13 páginas, sem os inserts. O passo do Dia 9 foi
 * reescrito para não depender do Cartão de Entrega.
 *
 * O Completo vem primeiro e marcado como "Recomendado" (mesma ordem do topo).
 * Sem preço riscado e sem "mais vendido": a única comparação na página é a
 * diferença real entre os dois planos (R$ 13,00).
 */
const bonus = [
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

function Item({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5">
      <Check className="mt-0.5 h-5 w-5 shrink-0 text-cta" aria-hidden="true" />
      <span>{children}</span>
    </li>
  )
}

export function OfferSection() {
  return (
    <section id="oferta" className="scroll-mt-4 bg-background px-5 py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-primary" data-reveal>
          Pagamento único • Acesso vitalício
        </p>
        <h2
          className="mt-3 text-balance text-center font-serif text-2xl font-bold text-foreground sm:text-3xl md:text-4xl"
          data-reveal
        >
          Escolha como você quer começar
        </h2>

        <div className="mt-10 grid items-start gap-6 md:grid-cols-2">
          {/* Completo */}
          <div
            className="overflow-hidden rounded-[2rem] bg-olive bg-[radial-gradient(90%_45%_at_50%_0%,color-mix(in_oklab,var(--gold)_22%,transparent),transparent_65%)] text-olive-foreground shadow-2xl shadow-olive/25"
            data-reveal
          >
            <div className="bg-gold px-6 py-2.5 text-center">
              <p className="text-xs font-extrabold uppercase tracking-wide text-[oklch(0.25_0.02_60)] sm:text-sm">
                Recomendado • com os 3 bônus
              </p>
            </div>

            <div className="px-5 py-8 sm:px-7">
              <p className="text-center text-xs font-extrabold uppercase tracking-[0.16em] text-olive-foreground/80">
                Devocional + 3 Bônus
              </p>
              <p className="mt-3 text-center font-serif text-5xl font-bold leading-none tabular-nums text-gold [text-shadow:0_6px_22px_color-mix(in_oklab,var(--gold)_40%,transparent)]">
                R$ 47,90
              </p>
              <p className="mt-2 text-center text-sm font-bold text-olive-foreground/90">
                R$ 13,00 a mais pelos 3 bônus
              </p>

              <ul className="mt-7 grid gap-2.5">
                <li className="flex items-start gap-3 rounded-2xl bg-gold/20 px-4 py-3.5 ring-1 ring-gold/55">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-cta" aria-hidden="true" />
                  <span className="text-sm font-bold leading-snug sm:text-base">Tudo do Devocional: os 9 dias completos</span>
                </li>
                {bonus.map(({ name, desc }) => (
                  <li
                    key={name}
                    className="flex items-start gap-3 rounded-2xl bg-olive-foreground/6 px-4 py-3.5 ring-1 ring-olive-foreground/12"
                  >
                    <Gift className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                    <span>
                      <span className="block text-sm font-bold leading-snug sm:text-base">{name}</span>
                      <span className="mt-1 block text-xs leading-relaxed text-olive-foreground/70 sm:text-sm">{desc}</span>
                    </span>
                  </li>
                ))}
              </ul>

              {/* Depoimento real (WhatsApp, 18/09, autorizado): fala do Cartão de
                  Entrega, que só existe no Completo. */}
              <figure className="mt-6 rounded-2xl bg-olive-foreground/6 px-4 py-3.5 ring-1 ring-gold/35">
                <blockquote className="text-sm italic leading-relaxed text-olive-foreground/90">
                  &ldquo;Eu preenchi o Cartão de Entrega, recortei e guardei dentro da minha Bíblia. Toda vez que sinto a
                  ansiedade voltar, eu olho para o cartão e lembro que entreguei o coração do meu filho a Deus.&rdquo;
                </blockquote>
                <figcaption className="mt-1.5 text-xs text-olive-foreground/65">— Maria Clara, compradora</figcaption>
              </figure>

              <div className="mt-7 flex flex-col items-center">
                <CtaButton plano="completo" price="R$ 47,90 — pagamento único" origin="oferta_completo">
                  Quero o Devocional + 3 Bônus
                </CtaButton>
              </div>
            </div>
          </div>

          {/* Básico */}
          <div className="rounded-[2rem] border border-gold/45 bg-card px-5 py-8 shadow-xl shadow-olive/10 sm:px-7" data-reveal>
            <p className="text-center text-xs font-extrabold uppercase tracking-[0.16em] text-muted-foreground">
              Só o Devocional
            </p>
            <p className="mt-3 text-center font-serif text-5xl font-bold leading-none tabular-nums text-olive">
              R$ 34,90
            </p>
            <p className="mt-2 text-center text-sm font-bold text-primary">R$ 3,87 por cada dia de oração</p>

            <ul className="mt-7 grid gap-3 text-sm leading-relaxed text-foreground sm:text-base">
              <Item>
                <strong className="font-bold">Os 9 dias completos</strong>: versículo, reflexão, oração pronta e um passo
                pequeno por dia
              </Item>
              <Item>PDF para ler no celular ou imprimir em casa, quantas vezes precisar</Item>
              <Item>Pagamento único, sem mensalidade</Item>
            </ul>

            <p className="mt-5 flex items-start gap-2.5 rounded-2xl bg-gold/12 px-3.5 py-3 text-sm leading-relaxed text-muted-foreground">
              <Gift className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
              <span>
                <strong className="font-bold text-foreground">3 bônus disponíveis</strong> no plano Devocional + 3 Bônus
              </span>
            </p>

            <div className="mt-7 flex flex-col items-center">
              <CtaButton
                plano="basico"
                price="R$ 34,90 — pagamento único"
                origin="oferta_basico"
                pulse={false}
                className="border-2 border-cta bg-transparent text-cta shadow-none"
              >
                Quero Só o Devocional
              </CtaButton>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Compra 100% segura • Entrega automática no seu e-mail • 7 dias de garantia
        </p>

        <p className="mt-7 text-center" data-reveal>
          <span className="balao">paga uma vez, usa a vida inteira</span>
        </p>

        {/* O relato de reaproximação vive aqui, depois do preço — e não na
            primeira tela, onde contradiria a anti-promessa que a copy dos
            anúncios usa para trazer a mãe até a página. */}
        <div className="mx-auto mt-9 grid max-w-2xl gap-6" data-reveal>
          {/* Depoimento real (WhatsApp, 18/09, autorizado). Fala de reação do
              filho, então fica aqui, depois do preço, como o da Juliana. */}
          <figure className="border-l-[3px] border-gold py-0.5 pl-4">
            <blockquote className="text-sm italic leading-relaxed text-foreground sm:text-base">
              &ldquo;Eu tava no fundo do poço com o silêncio do meu filho. Quando cheguei no Dia 2 e mandei uma
              mensagem só dizendo que lembrei dele, sem nenhuma pergunta ou cobrança, ele — que vivia me dando vácuo —
              respondeu na hora com um coração. Não resolveu tudo da noite pro dia, mas quebrou o gelo.&rdquo;
            </blockquote>
            <figcaption className="mt-2 text-xs text-muted-foreground">— Renata A., compradora</figcaption>
          </figure>
          <figure className="border-l-[3px] border-gold py-0.5 pl-4">
            <blockquote className="text-sm italic leading-relaxed text-foreground sm:text-base">
              &ldquo;Meu filho de 16 anos mal falava comigo. No dia 4 eu chorei orando, e naquela semana ele me
              procurou para conversar pela primeira vez em meses.&rdquo;
            </blockquote>
            <figcaption className="mt-2 text-xs text-muted-foreground">— Juliana M., mãe de um adolescente, 48 anos</figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
