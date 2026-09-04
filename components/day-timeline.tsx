import { CtaButton } from "@/components/cta-button"

/**
 * Títulos e subtítulos copiados LITERALMENTE do índice do PDF
 * (Devocional-da-Mae-que-Nao-Desiste.pdf, página 3 — "Os nove dias").
 * A versão anterior desta lista tinha nove títulos que não existem no
 * produto: nenhum dos nove coincidia. Não reescrever nem "melhorar".
 */
const days = [
  { day: 1, title: "O que eu não posso controlar", text: "Onde termina o meu esforço e começa a graça." },
  { day: 2, title: "O silêncio que dói", text: "Quando a conversa fica curta." },
  { day: 3, title: "Orar em vez de cobrar", text: "A conversa que muda de endereço." },
  { day: 4, title: "A culpa que não me pertence", text: "Nem tudo é falha sua." },
  { day: 5, title: "O que meus olhos não veem", text: "Deus trabalha no escondido." },
  { day: 6, title: "A palavra certa na hora certa", text: "Falar pouco e falar bem." },
  { day: 7, title: "Persistir sem forçar", text: "A oração que não desiste." },
  { day: 8, title: "A porta que fica aberta", text: "Um lugar onde ele sempre pode voltar." },
  { day: 9, title: "A entrega e a esperança", text: "O que eu construí, eu entrego." },
]

export function DayTimeline() {
  return (
    <section className="bg-secondary px-5 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-balance text-center font-serif text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
          Os 9 dias de oração pela vida do seu filho
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-muted-foreground sm:text-base">
          Um tema por dia. De 2 a 10 minutos. Cada dia traz um versículo, uma reflexão, uma oração pronta e um
          pequeno passo de reaproximação.
        </p>

        <ol className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {days.map(({ day, title, text }) => (
            <li
              key={day}
              className="flex items-start gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5"
            >
              <span className="inline-flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-xl bg-olive text-olive-foreground">
                <span className="text-[9px] font-bold uppercase leading-none tracking-wide opacity-70">Dia</span>
                <span className="font-serif text-lg font-bold leading-tight">{day}</span>
              </span>
              <div>
                <h3 className="font-serif text-base font-bold text-foreground">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex flex-col items-center gap-3">
          <CtaButton pulse={false}>Quero Começar o Dia 1 Agora</CtaButton>
          <p className="text-sm text-muted-foreground">Você faz a primeira oração ainda hoje.</p>
        </div>
      </div>
    </section>
  )
}
