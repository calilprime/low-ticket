import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    q: "Como recebo o PDF?",
    a: "Assim que o pagamento no PIX ou no cartão for confirmado, o devocional e os 3 bônus chegam automaticamente no e-mail que você cadastrar na compra — normalmente em menos de 2 minutos. É tudo digital, em PDF, com acesso vitalício.",
  },
  {
    q: "E se meu filho não quiser participar?",
    a: "Ele não precisa participar de nada — nem saber que você tem o devocional. Este material é para VOCÊ orar por ele. Cada dia é uma reflexão, um versículo e uma oração feitas para a mãe, não para o filho. Nenhuma conversa, nenhuma cobrança e nenhuma exigência da parte dele.",
  },
  {
    q: "Preciso imprimir?",
    a: "Não precisa. Você pode ler direto no celular, no tablet ou no computador. Mas se você gosta de escrever à mão, o material foi diagramado para ficar bonito impresso em folha A4 comum — inclusive o Planner e o Cartão de Entrega a Deus.",
  },
  {
    q: "Quanto tempo leva por dia?",
    a: "Entre 2 e 10 minutos. Dá para fazer de manhã antes de todo mundo acordar, na fila da escola ou à noite antes de dormir. Foi feito para caber na rotina de quem já está cansada.",
  },
  {
    q: "E se eu não gostar?",
    a: "Você tem 7 dias de garantia incondicional. Basta pedir o reembolso e devolvemos 100% do valor, sem perguntas.",
  },
]

export function FaqSection() {
  return (
    <section className="bg-secondary px-5 py-16 md:py-24">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-balance text-center font-serif text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
          Perguntas frequentes
        </h2>

        <Accordion className="mt-10 w-full gap-3">
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
