import Image from 'next/image'
import { BookOpen, Mail, Clock } from 'lucide-react'
import { CheckoutLink } from '@/components/checkout-link'

/**
 * A faixa de tempo vem do PDF, não de estimativa: os passos práticos dos dias
 * levam de 5 a 15 minutos, e o Dia 7 (descanso) é deliberadamente mais longo.
 * O criativo no ar anuncia "10 a 15 minutos" — os dois precisam bater, senão
 * a leitora chega na página e encontra outra promessa.
 */
const selos = [
  { icon: Clock, label: '10 a 15 minutos por dia' },
  { icon: BookOpen, label: 'Uma oração e um passo prático' },
  { icon: Mail, label: 'Chega no e-mail (leia no celular)' },
]

export function HeroSection() {
  return (
    <section className="bg-background px-5 pt-8 pb-16 md:pt-12 md:pb-24">
      <div className="mx-auto max-w-5xl">
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-olive/20 bg-olive/5 px-4 py-1.5 text-center text-xs font-medium text-olive md:text-sm">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-olive opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-olive" />
            </span>
            9 dias de fé e ordem para o seu lar.
          </span>
        </div>

        <div className="mt-8 flex flex-col items-center gap-10 lg:flex-row lg:gap-14">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="font-serif text-3xl leading-tight font-bold text-balance text-foreground sm:text-4xl md:text-5xl">
              Organize a casa e fortaleça a fé em 9 dias — um hábito por dia.
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg lg:mx-0">
              As tarefas ficam pela metade, o dia acaba e a culpa vem deitar no travesseiro.
              Você não precisa esperar a próxima segunda-feira. Cada um destes{' '}
              <strong className="font-semibold text-foreground">9 dias</strong> traz uma
              oração e <strong className="font-semibold text-foreground">um passo prático
              para a sua casa</strong>, em <em>10 a 15 minutos</em> — o Dia 7 é o do
              descanso e pede um pouco mais de você.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 lg:items-start">
              <CheckoutLink sub="Por apenas R$ 34,90">
                Quero me tornar uma Mãe Serena
              </CheckoutLink>
              <p className="text-sm text-muted-foreground">
                Acesso imediato no e-mail • Garantia de 7 dias
              </p>
            </div>

            <ul className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground lg:justify-start">
              {selos.map(({ icon: Icon, label }) => (
                <li key={label} className="inline-flex items-center gap-1.5">
                  <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full max-w-md flex-1">
            <div className="relative rounded-3xl bg-card p-3 shadow-2xl shadow-olive/10 ring-1 ring-border">
              <Image
                src="/capa.webp"
                alt="Devocional da Mãe Serena — capa do PDF com os 9 dias de oração"
                width={765}
                height={1024}
                priority
                className="rounded-2xl"
              />
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-olive px-4 py-1.5 text-center text-[0.65rem] font-semibold tracking-wide text-olive-foreground uppercase shadow-lg sm:text-xs">
                O devocional + 3 inserts para imprimir
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
