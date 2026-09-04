import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    q: 'Como recebo o PDF?',
    a: 'Imediatamente após a confirmação do pagamento, você recebe um e-mail com o link para baixar o devocional e todos os bônus.',
  },
  {
    q: 'Preciso de muito tempo livre?',
    a: 'Não. O material foi desenhado para mães exaustas e sem tempo. As leituras e orações levam de 2 a 10 minutos por dia.',
  },
  {
    q: 'Preciso imprimir?',
    a: 'Fica a seu critério. É um arquivo digital para imprimir em casa, e também otimizado para leitura na tela do celular.',
  },
  {
    q: 'E se eu não gostar?',
    a: 'Você tem 7 dias de garantia. Se achar que o devocional não trouxe paz para a sua rotina, basta mandar um e-mail e devolvemos 100% do seu dinheiro, sem burocracia.',
  },
]

export function FaqSection() {
  return (
    <section className="bg-secondary px-5 py-16 md:py-24">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-center font-serif text-2xl font-bold text-balance text-foreground sm:text-3xl md:text-4xl">
          Perguntas frequentes
        </h2>

        <Accordion multiple={false} className="mt-10 w-full">
          {faqs.map(({ q, a }) => (
            <AccordionItem key={q} value={q} className="border-border">
              <AccordionTrigger className="text-left font-serif text-base font-semibold text-foreground hover:no-underline">
                {q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
