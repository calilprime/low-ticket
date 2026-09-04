import { Feather, BookOpen, HandHeart } from 'lucide-react'

const passos = [
  {
    icon: Feather,
    n: '1',
    title: 'Uma reflexão que tira o peso',
    text: 'Escrita para acolher, não para apontar o dedo. Ela quebra a sua culpa antes da oração começar.',
  },
  {
    icon: BookOpen,
    n: '2',
    title: 'A Palavra que acalma',
    text: 'Um versículo estratégico para blindar sua mente contra a irritação e a ansiedade daquele dia.',
  },
  {
    icon: HandHeart,
    n: '3',
    title: 'Uma oração de 2 a 10 minutos',
    text: 'Direta e poderosa. Nos dias em que você não tem forças para criar palavras, ela clama por você.',
  },
]

export function WhatsInside() {
  return (
    <section className="bg-background px-5 py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center font-serif text-2xl font-bold text-balance text-foreground sm:text-3xl md:text-4xl">
          Você para de reagir no estresse e passa a agir com sabedoria
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-pretty text-muted-foreground sm:text-base">
          Enquanto o caos tenta dominar sua casa, você ganha uma âncora. Todos os dias, os
          mesmos 3 passos — perfeitos para a sua rotina corrida.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {passos.map(({ icon: Icon, n, title, text }) => (
            <article
              key={title}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-lg hover:shadow-olive/5"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold tracking-wide text-accent-foreground uppercase">
                  Passo {n}
                </span>
              </div>
              <h3 className="mt-4 font-serif text-lg font-semibold text-foreground">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
