import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const days = [
  { day: "Dia 1", title: "O que eu não posso controlar", note: "Onde termina o meu esforço e começa a graça" },
  { day: "Dia 2", title: "O silêncio que dói", note: "Quando a conversa fica curta" },
  { day: "Dia 3", title: "Orar em vez de cobrar", note: "A conversa que muda de endereço" },
  { day: "Dia 4", title: "A culpa que não me pertence", note: "Nem tudo é falha sua" },
  { day: "Dia 5", title: "O que meus olhos não veem", note: "Deus trabalha no escondido" },
  { day: "Dia 6", title: "A palavra certa na hora certa", note: "Falar pouco e falar bem" },
  { day: "Dia 7", title: "Persistir sem forçar", note: "A oração que não desiste" },
  { day: "Dia 8", title: "A porta que fica aberta", note: "Um lugar onde ele sempre pode voltar" },
  { day: "Dia 9", title: "A entrega e a esperança", note: "O que eu construí, eu entrego" },
]

export function DayTimeline() {
  return (
    <section className="bg-secondary px-5 py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-balance text-center font-serif text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
          O caminho dos 9 dias
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm leading-relaxed text-muted-foreground">
          Uma jornada progressiva que começa no seu coração e termina na entrega do futuro do seu filho a Deus.
        </p>

        <Accordion type="single" collapsible className="mt-10 w-full">
          {days.map(({ day, title, note }) => (
            <AccordionItem key={day} value={day} className="border-border">
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="flex items-center gap-4">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 font-serif text-sm font-bold text-primary">
                    {day.replace("Dia ", "")}
                  </span>
                  <span className="font-serif text-base font-semibold text-foreground">{title}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pl-14 text-sm leading-relaxed text-muted-foreground">
                {note
                  ? note
                  : "Uma reflexão profunda, uma oração pronta e um gesto prático de reconexão para viver junto com o seu filho."}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
