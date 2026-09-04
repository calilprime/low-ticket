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
  {
    n: '1',
    title: 'A paz começa em mim',
    note: 'Antes de organizar a casa, acalmar o coração.',
    habit: 'Escolher um “canto de respiro” na casa, deixar esse ponto limpo e livre, e reservar 5 minutos só para respirar.',
  },
  {
    n: '2',
    title: 'A manhã tranquila',
    note: 'Como você começa o dia decide como ele termina.',
    habit: 'Roupas de amanhã separadas, mesa do café pré-arrumada e mochilas prontas na porta — à noite, para poupar trinta minutos de estresse cedo.',
  },
  {
    n: '3',
    title: 'O peso que eu carrego sozinha',
    note: 'Dividir tarefas também é um ato de amor.',
    habit: 'Listar 3 tarefas que dá para delegar, conversar com a família sobre elas e anotar quem ficou com cada uma.',
  },
  {
    n: '4',
    title: 'A cozinha e o cuidado',
    note: 'O coração da casa merece ordem.',
    habit: 'Definir os jantares de 5 dias, conferir o que já tem em casa e fazer a lista do que falta comprar.',
  },
  {
    n: '5',
    title: 'A provisão e o orçamento',
    note: 'Paz também é saber para onde vai o dinheiro.',
    habit: 'Anotar quanto entra por mês, quais são os gastos essenciais e calcular quanto sobra ou falta.',
  },
  {
    n: '6',
    title: 'Os filhos e a paciência',
    note: 'Educar exige calma que nem sempre temos.',
    habit: 'Guardar o celular por completo, dar atenção total a cada filho e ouvir sem interromper nem corrigir.',
  },
  {
    n: '7',
    title: 'O descanso sem culpa',
    note: 'Você também precisa de cuidado. Este é o dia mais longo dos nove — de propósito.',
    habit: 'Escolher o que te faz bem, avisar a família e pedir que respeitem o seu tempo, e descansar sem sentir culpa.',
  },
  {
    n: '8',
    title: 'O lar como refúgio',
    note: 'Uma casa em paz é um abrigo para todos.',
    habit: 'Escolher um ritual de acolhimento para quando todos chegam, apresentar à família e praticar pela primeira vez hoje.',
  },
  {
    n: '9',
    title: 'A entrega e a gratidão',
    note: 'O que construímos, entregamos a Deus.',
    habit: 'Escrever a sua entrega no Cartão, recortar, dobrar e guardar em um lugar especial.',
  },
]

export function DayTimeline() {
  return (
    <section className="bg-secondary px-5 py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center font-serif text-2xl font-bold text-balance text-foreground sm:text-3xl md:text-4xl">
          Os 9 dias, e o hábito que cada um deixa na sua casa
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm leading-relaxed text-muted-foreground">
          Toque em qualquer dia para ver o passo prático. É este o hábito que fica — não é
          leitura solta, é uma coisa resolvida por dia.
        </p>

        <Accordion multiple={false} className="mt-10 w-full">
          {days.map(({ n, title, note, habit }) => (
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
                <span className="block">{note}</span>
                <span className="mt-3 block rounded-xl bg-primary/5 p-3 ring-1 ring-primary/10">
                  <span className="block text-[0.65rem] font-semibold tracking-wide text-primary uppercase">
                    O hábito do dia
                  </span>
                  <span className="mt-1 block text-foreground">{habit}</span>
                </span>
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
