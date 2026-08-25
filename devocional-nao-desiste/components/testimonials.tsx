import { Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "Eu acordava já cansada e ia dormir com o peito apertado. No terceiro dia eu percebi que tinha conseguido respirar. Cinco minutos, só isso — mas mudou o meu dia inteiro.",
    name: "Cláudia M.",
    role: "Mãe de dois, 47 anos",
  },
  {
    quote:
      "A culpa era o que mais me destruía. Sentia que estava falhando com todo mundo. O Cartão de Entrega a Deus virou meu ritual da noite e a paz voltou a caber na minha casa.",
    name: "Rosângela T.",
    role: "Mãe e dona de casa, 52 anos",
  },
  {
    quote:
      "Eu queria orar e não tinha forças nem palavras. As orações já vinham prontas, curtinhas. Foi como alguém orando comigo quando eu não conseguia sozinha.",
    name: "Fernanda L.",
    role: "Mãe e enfermeira, 44 anos",
  },
]

export function Testimonials() {
  return (
    <section className="bg-background px-5 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-balance text-center font-serif text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
          Mulheres que estavam no limite — e voltaram a respirar
        </h2>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map(({ quote, name, role }) => (
            <figure key={name} className="flex flex-col rounded-3xl border border-border bg-card p-6 shadow-sm">
              <Quote className="h-8 w-8 text-gold" aria-hidden="true" />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground sm:text-base">
                {quote}
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-4">
                <span className="block font-serif text-base font-bold text-foreground">{name}</span>
                <span className="text-xs text-muted-foreground">{role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
