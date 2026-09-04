import Image from 'next/image'
import { BookOpen, Mail, Clock } from 'lucide-react'
import { CheckoutLink } from '@/components/checkout-link'

const selos = [
  { icon: Clock, label: '2 a 10 minutos por dia' },
  { icon: BookOpen, label: '100% bíblico e prático' },
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
            O plano de oração de 9 dias para mães exaustas.
          </span>
        </div>

        <div className="mt-8 flex flex-col items-center gap-10 lg:flex-row lg:gap-14">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="font-serif text-3xl leading-tight font-bold text-balance text-foreground sm:text-4xl md:text-5xl">
              Como parar de gritar, dominar a exaustão e se tornar a Mãe Serena que o seu
              lar precisa?
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg lg:mx-0">
              Você promete que não vai perder a paciência, mas a rotina te engole e a culpa
              chega à noite. Em vez de promessas vazias, aplique este{' '}
              <strong className="font-semibold text-foreground">Plano de 9 Dias</strong>.
              Descubra orações estratégicas de <em>2 a 10 minutos</em> diários para blindar
              suas emoções, desarmar o estresse e trazer a paz de volta para sua casa —
              antes que você reaja no automático.
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
                src="/capa.jpg"
                alt="Devocional da Mãe Serena — capa do PDF com os 9 dias de oração"
                width={765}
                height={1024}
                priority
                className="rounded-2xl"
              />
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-olive px-4 py-1.5 text-center text-[0.65rem] font-semibold tracking-wide text-olive-foreground uppercase shadow-lg sm:text-xs">
                O guia definitivo + 3 bônus exclusivos
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
