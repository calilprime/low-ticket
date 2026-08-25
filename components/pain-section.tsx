import { BatteryLow, HeartCrack, CloudOff, TriangleAlert } from "lucide-react"

const pains = [
  {
    icon: BatteryLow,
    title: "Cansaço Invisível",
    text: "Acordar cansada, dormir ansiosa e passar o dia inteiro sobrecarregada — sem que ninguém perceba o peso que você carrega.",
  },
  {
    icon: HeartCrack,
    title: "A Culpa Devastadora",
    text: "A sensação de estar falhando como mãe e esposa, perdendo a paciência com quem você mais ama e se cobrando por isso todas as noites.",
  },
  {
    icon: CloudOff,
    title: "O Silêncio Espiritual",
    text: "A vontade de orar existe, mas não sobra força nem tempo. E aí vem a distância de Deus justamente quando você mais precisa Dele.",
  },
]

export function PainSection() {
  return (
    <section className="bg-secondary px-5 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-balance text-center font-serif text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
          Se você se reconhece em alguma dessas três frases, este devocional foi escrito para você
        </h2>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {pains.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="flex flex-col rounded-3xl border border-border bg-card p-6 shadow-sm md:p-7"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-rose/25 text-primary">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-serif text-lg font-bold text-foreground sm:text-xl">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{text}</p>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-10 flex max-w-3xl items-start gap-4 rounded-3xl border-l-4 border-destructive bg-destructive/8 p-6 md:p-7">
          <TriangleAlert className="mt-0.5 h-6 w-6 shrink-0 text-destructive" aria-hidden="true" />
          <p className="text-pretty text-sm font-semibold leading-relaxed text-foreground sm:text-base">
            Continuar empurrando esse cansaço com a barriga não vai fazer a paz voltar. O esgotamento emocional cobra
            um preço alto da sua saúde e da sua família.
          </p>
        </div>
      </div>
    </section>
  )
}
