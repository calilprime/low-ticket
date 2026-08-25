import { HeartHandshake, BookMarked, HandHeart } from "lucide-react"

const pillars = [
  {
    step: "1",
    icon: HeartHandshake,
    title: "Uma reflexão diária acolhedora",
    text: "Escrita para mãe, não para teólogo. Ela nomeia o que você está sentindo e tira o peso da culpa antes de você começar a orar.",
  },
  {
    step: "2",
    icon: BookMarked,
    title: "Um versículo de restauração da família",
    text: "A promessa de Deus para aquele dia — a mesma Palavra em que você se agarra quando a porta continua fechada.",
  },
  {
    step: "3",
    icon: HandHeart,
    title: "Um passo de oração de 2 a 10 minutos",
    text: "A oração já vem pronta, com direção clara do que clamar pela vida dele. Nos dias em que faltam palavras, ela ora por você.",
  },
]

export function WhatsInside() {
  return (
    <section className="bg-background px-5 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-primary">O Plano de 9 Dias</p>
        <h2 className="mt-3 text-balance text-center font-serif text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
          Você para de orar no desespero e passa a orar com direção
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-center text-sm leading-relaxed text-muted-foreground sm:text-base">
          Enquanto ele está afastado, você tem um caminho para seguir. Todo dia os mesmos 3 passos — e eles cabem
          entre 2 e 10 minutos da sua rotina.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {pillars.map(({ step, icon: Icon, title, text }) => (
            <article
              key={title}
              className="relative flex flex-col rounded-3xl border border-gold/30 bg-sand/50 p-6 md:p-7"
            >
              <span className="absolute -top-4 left-6 inline-flex h-9 w-9 items-center justify-center rounded-full bg-olive font-serif text-base font-bold text-olive-foreground shadow-md">
                {step}
              </span>
              <Icon className="mt-4 h-7 w-7 text-primary" aria-hidden="true" />
              <h3 className="mt-4 font-serif text-lg font-bold text-foreground sm:text-xl">{title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground sm:text-base">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
