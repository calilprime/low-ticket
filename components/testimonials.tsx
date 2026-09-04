import { Quote } from 'lucide-react'

/**
 * Depoimentos de compradoras reais, confirmados e autorizados pelo cliente.
 * Não adicionar, não editar e não inventar depoimento nenhum aqui sem
 * autorização explícita — nem "melhorar" o texto dos que já existem.
 */
const testimonials = [
  {
    quote:
      'Eu gritava por qualquer coisa e a culpa me matava. No 3º dia do devocional, meu filho derrubou suco no sofá e, em vez de explodir, eu apenas respirei e limpei. O clima da minha casa mudou da água pro vinho.',
    name: 'Camila S.',
    role: 'Mãe de 2',
  },
  {
    quote:
      'Achei que não tinha tempo para ler. Mas esses 5 minutinhos no celular antes de levantar blindam meu dia inteiro. Parei de ser refém do meu próprio estresse.',
    name: 'Mariana R.',
    role: 'Mãe de 3',
  },
  {
    quote:
      'O Dia 2 tirou uma tonelada das minhas costas. Eu chorava lendo porque parecia que alguém finalmente entendia minha exaustão. Hoje sou outra mãe, muito mais leve.',
    name: 'Juliana T.',
    role: 'Mãe de primeira viagem',
  },
]

export function Testimonials() {
  return (
    <section className="bg-background px-5 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-serif text-2xl font-bold text-balance text-foreground sm:text-3xl md:text-4xl">
          Mães que trocaram os gritos de exaustão pelo silêncio da paz
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map(({ quote, name, role }) => (
            <figure
              key={name}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <Quote className="h-8 w-8 text-gold" aria-hidden="true" />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground">
                {quote}
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-4">
                <span className="block font-serif text-base font-semibold text-foreground">
                  {name}
                </span>
                <span className="text-xs text-muted-foreground">{role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
