import { Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "Meu filho de 16 anos mal falava comigo. No dia 4 eu chorei orando, e naquela semana ele me procurou pra conversar pela primeira vez em meses. Não foi mágica, foi Deus agindo na minha oração.",
    name: "Cláudia M.",
    role: "Mãe de um adolescente, 47 anos",
  },
  {
    quote:
      "Eu carregava uma culpa enorme achando que tinha falhado. A Carta da Entrega Materna me libertou disso. Hoje oro com fé em vez de orar com desespero.",
    name: "Rosângela T.",
    role: "Mãe de dois filhos, 52 anos",
  },
  {
    quote:
      "Minha filha estava distante e envolvida com amizades que me preocupavam. O mapeamento de oração mudou o meu foco. A relação está sendo reconstruída aos poucos, com paz.",
    name: "Fernanda L.",
    role: "Mãe de uma jovem, 44 anos",
  },
]

export function Testimonials() {
  return (
    <section className="bg-background px-5 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-balance text-center font-serif text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
          Mães que viraram o jogo através da oração
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map(({ quote, name, role }) => (
            <figure
              key={name}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <Quote className="h-8 w-8 text-gold" aria-hidden="true" />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground">{quote}</blockquote>
              <figcaption className="mt-6 border-t border-border pt-4">
                <span className="block font-serif text-base font-semibold text-foreground">{name}</span>
                <span className="text-xs text-muted-foreground">{role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
