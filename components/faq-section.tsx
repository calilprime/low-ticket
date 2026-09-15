import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    q: "Como recebo?",
    a: "Assim que o pagamento no PIX ou no cartão for confirmado, o devocional chega automaticamente no e-mail que você cadastrar na compra — normalmente em menos de 2 minutos. No plano Devocional + 3 Bônus, os bônus chegam junto. É tudo digital, em PDF, com acesso vitalício.",
  },
  {
    q: "E se meu filho não quiser participar?",
    a: "Ele não precisa participar de nada — nem saber que você tem o devocional. Este material é para VOCÊ orar por ele. Cada dia é uma reflexão, um versículo e uma oração feitas para a mãe, não para o filho. Nenhuma conversa, nenhuma cobrança e nenhuma exigência da parte dele.",
  },
  {
    q: "E se eu não gostar?",
    a: "Você tem 7 dias de garantia. Basta mandar um e-mail pedindo o reembolso e devolvemos 100% do valor, sem burocracia.",
  },
]

export function FaqSection() {
  return (
    <section className="bg-secondary px-5 py-16 md:py-24">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-balance text-center font-serif text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
          Perguntas frequentes
        </h2>

        <Accordion className="mt-10 w-full gap-3" data-reveal>
          {faqs.map(({ q, a }) => (
            <AccordionItem
              key={q}
              value={q}
              className="rounded-2xl border border-border bg-card px-5 not-last:border-b"
            >
              <AccordionTrigger className="py-4 text-left font-serif text-base font-bold text-foreground hover:no-underline sm:text-lg">
                {q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
