import { DoorClosed, HeartCrack, MessageCircleOff, Quote } from "lucide-react"

const pains = [
  {
    icon: MessageCircleOff,
    title: "O Silêncio Dói",
    text: "Você tenta puxar assunto, ele se fecha, e você fica sem saber se ora ou se chora.",
  },
  {
    icon: DoorClosed,
    title: "A Sensação de Distanciamento",
    text: "A dor de ver o filho que você criou com tanto amor agir como se você fosse uma estranha dentro da própria casa.",
  },
  {
    icon: HeartCrack,
    title: "Sem Saber o Que Pedir a Deus",
    text: "Querer clamar pela vida dele, mas estar tão angustiada que as palavras somem justamente na hora de orar.",
  },
]

export function PainSection() {
  return (
    <section className="bg-secondary px-5 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-balance text-center font-serif text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
          Se a porta do quarto dele virou um muro, você não está sozinha
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

        <div className="mx-auto mt-10 flex max-w-3xl items-start gap-4 rounded-3xl border-l-4 border-primary bg-gold/12 p-6 md:p-7">
          <Quote className="mt-0.5 h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
          <p className="text-pretty font-serif text-base font-semibold leading-relaxed text-foreground sm:text-lg">
            O problema não é achar a palavra certa para falar com ele. É aprender o que falar com Deus enquanto ele
            não conversa com você.
          </p>
        </div>
      </div>
    </section>
  )
}
