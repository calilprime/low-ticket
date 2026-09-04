import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { CheckoutLink } from '@/components/checkout-link'

/**
 * Títulos e subtítulos copiados LITERALMENTE do índice do PDF
 * (Devocional-da-Mae-Serena.pdf, página 3 — "Os nove dias").
 * Não reescrever, não "melhorar", não inventar dias novos: a versão
 * anterior desta página listava dias que não existiam no produto.
 */
const days = [
  { n: '1', title: 'A paz começa em mim', note: 'Antes de organizar a casa, acalmar o coração.' },
  { n: '2', title: 'A manhã tranquila', note: 'Como você começa o dia decide como ele termina.' },
  { n: '3', title: 'O peso que eu carrego sozinha', note: 'Dividir tarefas também é um ato de amor.' },
  { n: '4', title: 'A cozinha e o cuidado', note: 'O coração da casa merece ordem.' },
  { n: '5', title: 'A provisão e o orçamento', note: 'Paz também é saber para onde vai o dinheiro.' },
  { n: '6', title: 'Os filhos e a paciência', note: 'Educar exige calma que nem sempre temos.' },
  { n: '7', title: 'O descanso sem culpa', note: 'Você também precisa de cuidado.' },
  { n: '8', title: 'O lar como refúgio', note: 'Uma casa em paz é um abrigo para todos.' },
  { n: '9', title: 'A entrega e a gratidão', note: 'O que construímos, entregamos a Deus.' },
]

export function DayTimeline() {
  return (
    <section className="bg-secondary px-5 py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center font-serif text-2xl font-bold text-balance text-foreground sm:text-3xl md:text-4xl">
          Os 9 dias de restauração da sua paz mental e espiritual
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm leading-relaxed text-muted-foreground">
          Um tema por dia. Nove dias para transformar a atmosfera da sua casa.
        </p>

        <Accordion multiple={false} className="mt-10 w-full">
          {days.map(({ n, title, note }) => (
            <AccordionItem key={n} value={n} className="border-border">
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="flex items-center gap-4">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 font-serif text-sm font-bold text-primary">
                    {n}
                  </span>
                  <span className="font-serif text-base font-semibold text-foreground">
                    {title}
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pl-14 text-sm leading-relaxed text-muted-foreground">
                {note}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 flex flex-col items-center gap-3">
          <CheckoutLink sub="Apenas R$ 34,90">Quero começar o Dia 1 agora</CheckoutLink>
          <p className="text-sm text-muted-foreground">
            Você faz a primeira leitura ainda hoje.
          </p>
        </div>
      </div>
    </section>
  )
}
