import { Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "Meu filho de 16 anos mal falava comigo. No dia 4 eu chorei orando, e naquela semana ele me procurou para conversar pela primeira vez em meses. Não foi mágica, foi Deus agindo na minha oração.",
    name: "Cláudia M.",
    role: "Mãe de um adolescente, 47 anos",
  },
  {
    quote:
      "Eu não sabia mais o que pedir. Só chorava. Ter a oração pronta na minha frente me devolveu a direção — eu parei de orar no desespero e comecei a orar com fé.",
    name: "Rosângela T.",
    role: "Mãe de dois filhos, 52 anos",
  },
  {
    quote:
      "Minha filha me tratava como estranha dentro de casa. Escrevi o nome dela no Cartão de Entrega e entreguei a Deus. A relação está sendo reconstruída aos poucos, com paz.",
    name: "Fernanda L.",
    role: "Mãe de uma jovem, 44 anos",
  },
]

export function Testimonials() {
  return (
    <section className="bg-background px-5 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-balance text-center font-serif text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
          Mães que continuaram orando quando a porta ainda estava fechada
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
