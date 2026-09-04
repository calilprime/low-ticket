import { Feather, BookOpen, HandHeart, ListChecks } from 'lucide-react'

/**
 * Os quatro blocos são a estrutura real de cada dia do PDF: versículo,
 * reflexão, oração e passo prático. O passo prático é o "1 hábito por dia"
 * que o criativo anuncia — ele existe no produto desde sempre, mas a página
 * não o mostrava, e era justamente o que a leitora tinha vindo buscar.
 */
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
    title: 'Um versículo para o dia',
    text: 'A Palavra daquele dia, em Almeida Revista e Corrigida, ligada ao passo que você vai dar na sua casa.',
  },
  {
    icon: HandHeart,
    n: '3',
    title: 'Uma oração pronta',
    text: 'Nos dias em que você não tem forças para criar palavras, ela ora por você — sem precisar pensar no que dizer.',
  },
  {
    icon: ListChecks,
    n: '4',
    title: 'Um passo prático na casa',
    text: 'O hábito do dia, com três marcações para riscar. Pequeno de propósito: cabe em 10 a 15 minutos e fica feito.',
  },
]

export function WhatsInside() {
  return (
    <section className="bg-background px-5 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-serif text-2xl font-bold text-balance text-foreground sm:text-3xl md:text-4xl">
          Todo dia você ora por uma coisa e resolve uma coisa
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-pretty text-muted-foreground sm:text-base">
          Nada de reorganizar a casa inteira num sábado. São os mesmos 4 blocos todos os
          dias, na mesma ordem — e ao fim de 9 dias a rotina mudou sozinha.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
                  {n} de 4
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
