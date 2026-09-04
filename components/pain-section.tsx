import { HeartCrack, BatteryLow, Moon } from 'lucide-react'

const points = [
  {
    icon: HeartCrack,
    title: 'O peso da culpa',
    text: 'Você perde a paciência, grita e depois vai dormir chorando, sentindo-se a pior mãe do mundo por não conseguir se controlar.',
  },
  {
    icon: BatteryLow,
    title: 'A exaustão invisível',
    text: 'Cuidar de tudo e de todos esgota sua energia. Quando você vê, está sobrevivendo no piloto automático, sem afeto ou paciência.',
  },
  {
    icon: Moon,
    title: 'Sem forças para orar',
    text: 'Você quer buscar a Deus e pedir calma, mas o cansaço é tanto que a mente apaga antes mesmo de formular um pedido por ajuda.',
  },
]

export function PainSection() {
  return (
    <section className="bg-olive px-5 py-16 text-olive-foreground md:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="font-serif text-2xl leading-snug font-bold text-balance sm:text-3xl md:text-4xl">
          Se o seu lar virou um campo de batalha, a culpa não é sua (mas a solução está nas
          suas mãos)
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

        <blockquote className="mx-auto mt-12 max-w-2xl border-l-2 border-gold pl-6 text-left font-serif text-lg leading-relaxed text-balance italic text-olive-foreground/90 sm:text-xl">
          “O problema não é o caos do dia a dia. É como as suas emoções reagem a ele. A
          verdadeira paz no lar começa quando a mãe encontra a paz em Deus.”
        </blockquote>
      </div>
    </section>
  )
}
