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
    a: 'Não. Cada dia leva de 10 a 15 minutos entre a leitura, a oração e o passo prático — e o passo é pequeno de propósito, para caber numa rotina que já está cheia. A única exceção é o Dia 7, que é o do descanso e pede um pouco mais de você.',
  },
  {
    q: 'É assinatura? Vou ser cobrada de novo?',
    a: 'Não. São R$ 34,90 uma única vez, sem mensalidade e sem renovação. O acesso é vitalício: o arquivo é seu, fica no seu e-mail e você pode baixar quantas vezes quiser.',
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
