import { BookOpenText, HandHeart, Sparkles } from "lucide-react"

const pillars = [
  {
    step: "1",
    icon: BookOpenText,
    title: "Versículo Acolhedor",
    text: "Uma palavra curta e certeira para o seu dia — escolhida para acalmar a mente antes mesmo de você começar a resolver os problemas.",
  },
  {
    step: "2",
    icon: HandHeart,
    title: "Oração Curta de 5 Minutos",
    text: "Já escrita para você. Basta ler. Nos dias em que faltam palavras, a oração fala por você.",
  },
  {
    step: "3",
    icon: Sparkles,
    title: "Pequeno Hábito Prático",
    text: "Uma atitude simples do dia, que cabe na sua rotina real e devolve leveza para dentro de casa.",
  },
]

export function WhatsInside() {
  return (
    <section className="bg-background px-5 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-primary">O Método de 9 Dias</p>
        <h2 className="mt-3 text-balance text-center font-serif text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
          Todo dia você recebe os mesmos 3 passos — e eles levam 5 minutos
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-center text-sm leading-relaxed text-muted-foreground sm:text-base">
          Nada de leitura longa, nada de estudo teológico pesado. Um caminho simples, feito para quem já está no
          limite e mesmo assim não quer largar a mão de Deus.
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
