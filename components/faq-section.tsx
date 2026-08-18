import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    q: "É um livro físico?",
    a: "Não. É um produto 100% digital em PDF, que você recebe no seu e-mail em até 2 minutos após o pagamento. Você pode ler no celular, no computador ou imprimir em casa.",
  },
  {
    q: "Funciona para filhos adolescentes ou adultos?",
    a: "Sim. As orações e reflexões foram escritas para mães de filhos de qualquer idade — adolescentes, jovens e adultos. O foco é a reconexão espiritual e emocional, que não tem idade.",
  },
  {
    q: "Como recebo após o pagamento?",
    a: "Assim que o Pix ou cartão for confirmado, o arquivo digital é enviado automaticamente para o e-mail que você cadastrar na compra. O acesso é imediato.",
  },
  {
    q: "E se eu tiver pouco tempo no dia?",
    a: "Cada dia foi pensado para caber na rotina de uma mãe ocupada: entre 2 e 10 minutos. Você pode fazer de manhã, à noite ou no momento que for melhor para você.",
  },
]

export function FaqSection() {
  return (
    <section className="bg-secondary px-5 py-16 md:py-24">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-balance text-center font-serif text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
          Perguntas frequentes
        </h2>

        <Accordion type="single" collapsible className="mt-10 w-full">
          {faqs.map(({ q, a }) => (
            <AccordionItem key={q} value={q} className="border-border">
              <AccordionTrigger className="text-left font-serif text-base font-semibold text-foreground hover:no-underline">
                {q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
