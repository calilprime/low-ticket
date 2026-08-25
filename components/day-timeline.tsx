import { CtaButton } from "@/components/cta-button"

const days = [
  { day: 1, title: "O Primeiro Clamor", text: "Levar a Deus a dor que você ainda não conseguiu falar em voz alta." },
  { day: 2, title: "A Culpa Sai do Trono", text: "Parar de se julgar pelo passado para conseguir orar pelo presente." },
  { day: 3, title: "Oração pelo Coração Dele", text: "Clamar pelo que está fechado por dentro, não só pela porta fechada." },
  { day: 4, title: "Quebrando o Silêncio", text: "Orar pela reabertura do diálogo — no tempo de Deus, não na sua ansiedade." },
  { day: 5, title: "Proteção no Caminho", text: "Cobrir a vida dele, as companhias e as escolhas que você não enxerga." },
  { day: 6, title: "Paciência para Esperar", text: "Trocar a cobrança pela constância de quem confia na promessa." },
  { day: 7, title: "A Entrega", text: "Colocar nas mãos de Deus o filho que você não consegue mais carregar sozinha." },
  { day: 8, title: "Paz na Casa", text: "Pedir que o clima do lar mude começando pelo seu próprio coração." },
  { day: 9, title: "A Ponte Reconstruída", text: "Sair dos 9 dias com uma rotina de oração que não depende da reação dele." },
]

export function DayTimeline() {
  return (
    <section className="bg-secondary px-5 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-balance text-center font-serif text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
          Os 9 dias de oração pela vida do seu filho
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-muted-foreground sm:text-base">
          Um tema por dia. De 2 a 10 minutos. Nove dias para você orar com direção enquanto ele ainda está distante.
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
