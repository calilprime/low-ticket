import { CtaButton } from "@/components/cta-button"

/**
 * Os quatro passos e os nove dias em uma seção só.
 *
 * Eram duas: "O Plano de 9 Dias" com três pilares em card, e "Os 9 dias de
 * oração" com nove cards. Diziam a mesma coisa em sequência, e juntas eram o
 * trecho mais alto da página.
 *
 * Títulos copiados LITERALMENTE do índice do PDF
 * (Devocional-da-Mae-que-Nao-Desiste.pdf, página 3 — "Os nove dias").
 * A versão anterior desta lista tinha nove títulos que não existem no
 * produto: nenhum dos nove coincidia. Não reescrever nem "melhorar".
 *
 * Os subtítulos saíram: nenhum dizia algo que o título já não dissesse.
 */
const days = [
  "O que eu não posso controlar",
  "O silêncio que dói",
  "Orar em vez de cobrar",
  "A culpa que não me pertence",
  "O que meus olhos não veem",
  "A palavra certa na hora certa",
  "Persistir sem forçar",
  "A porta que fica aberta",
  "A entrega e a esperança",
]

export function WhatsInside() {
  return (
    <section className="bg-background px-5 py-16 md:py-24">
      <div className="mx-auto max-w-2xl">
        <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-primary" data-reveal>
          O Plano de 9 Dias
        </p>
        <h2
          className="mt-3 text-balance text-center font-serif text-2xl font-bold text-foreground sm:text-3xl md:text-4xl"
          data-reveal
        >
          Você para de orar no desespero e passa a orar com direção
        </h2>

        <p
          className="mt-8 rounded-3xl border-l-4 border-gold bg-sand p-5 text-sm leading-relaxed text-foreground sm:text-base"
          data-reveal
        >
          Todo dia, os mesmos quatro passos — e cabem entre 2 e 10 minutos:{" "}
          <strong className="font-bold text-[oklch(0.46_0.12_42)]">um versículo em ARC</strong> ·{" "}
          <strong className="font-bold text-[oklch(0.46_0.12_42)]">uma reflexão curta</strong> ·{" "}
          <strong className="font-bold text-[oklch(0.46_0.12_42)]">uma oração pronta</strong> ·{" "}
          <strong className="font-bold text-[oklch(0.46_0.12_42)]">um passo pequeno de reaproximação</strong>.
        </p>

        <ol className="mt-8" data-reveal>
          {days.map((title, i) => (
            <li
              key={title}
              className={`grid grid-cols-[1.75rem_1fr] items-baseline gap-3 border-b border-border py-2.5 text-[0.92rem] font-semibold last:border-b-0 ${
                i === 0 ? "text-[oklch(0.46_0.12_42)]" : "text-foreground"
              }`}
            >
              <span
                className={`font-serif text-base font-bold tabular-nums ${i === 0 ? "text-primary" : "text-gold"}`}
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <span>
                <span className="sr-only">Dia {i + 1}: </span>
                {title}
              </span>
            </li>
          ))}
        </ol>

        <p className="mt-9 text-center" data-reveal>
          <span className="balao balao-cima">o Dia 1 você faz ainda hoje</span>
        </p>

        <div className="mt-8 flex flex-col items-center gap-3" data-reveal>
          <CtaButton pulse={false}>Quero Começar o Dia 1 Agora</CtaButton>
        </div>
      </div>
    </section>
  )
}
