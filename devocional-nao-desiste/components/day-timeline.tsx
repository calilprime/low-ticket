import { CtaButton } from "@/components/cta-button"

const days = [
  { day: 1, title: "Descanso", text: "Parar de carregar sozinha o peso que nunca foi só seu." },
  { day: 2, title: "Mente Ansiosa", text: "Silenciar o pensamento acelerado que rouba o seu sono." },
  { day: 3, title: "Culpa", text: "Sair do tribunal onde você é ré todos os dias." },
  { day: 4, title: "Paciência", text: "Reagir com calma quando tudo em você quer explodir." },
  { day: 5, title: "Força Renovada", text: "Encontrar energia para o dia que ainda nem começou." },
  { day: 6, title: "Paz no Lar", text: "Mudar o clima da casa começando pelo seu coração." },
  { day: 7, title: "Entrega", text: "Colocar nas mãos de Deus o que você não consegue resolver." },
  { day: 8, title: "Gratidão", text: "Enxergar de novo o que o cansaço tinha apagado." },
  { day: 9, title: "Recomeço", text: "Sair dos 9 dias com uma rotina de fé que se sustenta." },
]

export function DayTimeline() {
  return (
    <section className="bg-secondary px-5 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-balance text-center font-serif text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
          Os 9 dias da sua transformação
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-muted-foreground sm:text-base">
          Um tema por dia. Cinco minutos por dia. Nove dias para respirar de novo.
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
          <CtaButton pulse={false}>Quero Meus 9 Dias de Renovação</CtaButton>
          <p className="text-sm text-muted-foreground">Você começa o Dia 1 ainda hoje.</p>
        </div>
      </div>
    </section>
  )
}
