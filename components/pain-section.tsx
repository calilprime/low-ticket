import { HeartCrack, BatteryLow, Moon } from 'lucide-react'

/**
 * As três dores vêm da legenda do criativo que traz o tráfego: tarefas pela
 * metade, a culpa no travesseiro e a "próxima segunda-feira" que nunca chega.
 * A versão anterior falava de gritar e de exaustão emocional — dores de outro
 * anúncio, e a leitora chegava aqui sem se reconhecer no que tinha clicado.
 */
const points = [
  {
    icon: BatteryLow,
    title: 'As tarefas ficam pela metade',
    text: 'Você começa o dia com uma lista e termina com metade dela. O que não deu tempo hoje entra na conta de amanhã, e a casa nunca fica pronta.',
  },
  {
    icon: Moon,
    title: 'A culpa vem deitar no travesseiro',
    text: 'Trabalhar o dia inteiro e ainda ir dormir com a sensação de estar sempre devendo alguma coisa — para a casa, para os filhos, para você mesma.',
  },
  {
    icon: HeartCrack,
    title: 'A próxima segunda-feira nunca chega',
    text: 'Você adia a organização para quando a semana recomeçar. Quando ela recomeça, a rotina engole o plano de novo e tudo volta a ser o que era.',
  },
]

export function PainSection() {
  return (
    <section className="bg-olive px-5 py-16 text-olive-foreground md:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="font-serif text-2xl leading-snug font-bold text-balance sm:text-3xl md:text-4xl">
          A casa nunca fica pronta — e no fim do dia ainda sobra a culpa
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {points.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl bg-olive-foreground/5 p-6 text-left ring-1 ring-olive-foreground/10"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold/20 text-gold">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-serif text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-olive-foreground/80">{text}</p>
            </div>
          ))}
        </div>

        {/* Citação retirada da abertura do próprio PDF (página 2). A frase que
            estava aqui antes — "o problema não é o caos do dia a dia" — negava
            exatamente o que o anúncio promete resolver, e também o que o
            produto diz de si mesmo. */}
        <blockquote className="mx-auto mt-12 max-w-2xl border-l-2 border-gold pl-6 text-left font-serif text-lg leading-relaxed text-balance italic text-olive-foreground/90 sm:text-xl">
          “Ordem no lar e paz no coração caminham juntas. Não adianta organizar a casa se a
          alma está em desordem — e não adianta orar por serenidade se a rotina continua um
          caos que rouba a sua energia todos os dias.”
        </blockquote>
      </div>
    </section>
  )
}
