import { BookOpen, Map, Feather, CalendarDays } from "lucide-react"

type Item = {
  icon: typeof BookOpen
  tag: string
  title: string
  text: string
  value?: string
}

const items: Item[] = [
  {
    icon: BookOpen,
    tag: "Principal",
    title: "Os 9 Dias de Oração pelo Coração do Seu Filho",
    text: "Cada dia traz um versículo na versão ARC, uma reflexão curta escrita para mães, uma oração pronta e um pequeno passo de reaproximação — de 2 a 10 minutos.",
  },
  {
    icon: Map,
    tag: "Bônus 1",
    value: "De R$ 29 por R$ 0",
    title: "Cartão de Entrega",
    text: "Uma página para recortar, escrever o nome do seu filho e o que você entrega a Deus, e guardar na Bíblia ou na carteira.",
  },
  {
    icon: Feather,
    tag: "Bônus 2",
    value: "De R$ 19 por R$ 0",
    title: "Checklist dos 9 Dias",
    text: "Uma folha para imprimir e marcar cada dia concluído, com espaço para anotar o seu horário fixo de oração.",
  },
  {
    icon: CalendarDays,
    tag: "Bônus 3",
    value: "De R$ 27 por R$ 0",
    title: "Quadro de Orações Respondidas",
    text: "Um registro para anotar o que você pediu e o que foi acontecendo — inclusive as respostas pequenas, que a memória apaga.",
  },
]

export function WhatsInside() {
  return (
    <section className="bg-background px-5 py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-balance text-center font-serif text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
          O que você vai receber no seu arquivo digital
        </h2>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {items.map(({ icon: Icon, tag, title, text, value }) => (
            <article
              key={title}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-lg hover:shadow-olive/5"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent-foreground">
                  {tag}
                </span>
                {value ? (
                  <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary">
                    {value}
                  </span>
                ) : null}
              </div>
              <h3 className="mt-4 font-serif text-lg font-semibold text-foreground">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
