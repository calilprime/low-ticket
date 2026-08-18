import { HeartCrack, HandHeart, Anchor } from "lucide-react"

const points = [
  {
    icon: HeartCrack,
    title: "O medo em silêncio",
    text: "A dor de ver o filho crescendo distante, fechado no quarto ou resistente à fé e ao diálogo.",
  },
  {
    icon: HandHeart,
    title: "O cansaço da culpa",
    text: "A sensação de ter falhado na criação ou de que já é tarde demais para mudar as coisas.",
  },
  {
    icon: Anchor,
    title: "A virada de chave",
    text: "Deus não desistiu do seu filho, e a sua oração estruturada é o maior escudo que ele pode ter.",
  },
]

export function PainSection() {
  return (
    <section className="bg-olive px-5 py-16 text-olive-foreground md:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-balance font-serif text-2xl font-bold leading-snug sm:text-3xl md:text-4xl">
          Você não é uma mãe ruim. Você só está lutando uma batalha espiritual sem as armas certas.
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {points.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl bg-olive-foreground/5 p-6 text-left ring-1 ring-olive-foreground/10"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold/20 text-gold">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-serif text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-olive-foreground/80">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
