import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShieldCheck, Mail, Clock } from "lucide-react"

const CHECKOUT_URL = "https://pay.herospark.com/devocional-da-mae-que-nao-desiste-538247"

export function HeroSection() {
  return (
    <section className="bg-background px-5 pb-16 pt-8 md:pb-24 md:pt-12">
      <div className="mx-auto max-w-5xl">
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-olive/20 bg-olive/5 px-4 py-1.5 text-center text-xs font-medium text-olive md:text-sm">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-olive opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-olive" />
            </span>
            ⚠️ OFERTA DE LANÇAMENTO: Condição especial por tempo limitado.
          </span>
        </div>

        <div className="mt-8 flex flex-col items-center gap-10 lg:flex-row lg:gap-14">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-balance font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl md:text-5xl">
              Para a mãe que sente que está perdendo o filho... e recusa desistir dele.
            </h1>
            <p className="mx-auto mt-5 max-w-lg text-pretty font-serif text-base italic leading-relaxed text-muted-foreground sm:text-lg lg:mx-0">
              9 dias de orações estratégicas para quebrar o muro de silêncio e trazer o coração dele de volta para
              casa.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 lg:items-start">
              <Button
                asChild
                size="lg"
                className="h-auto w-full max-w-md rounded-full px-8 py-5 text-base font-bold uppercase leading-snug tracking-wide shadow-xl shadow-primary/25 transition-transform hover:scale-[1.02] sm:text-lg"
              >
                <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer">
                  QUERO RESGATAR O CORAÇÃO DO MEU FILHO
                </a>
              </Button>
              <p className="text-sm text-muted-foreground">⚡ Acesso imediato no e-mail • 7 dias de garantia</p>
              <p className="text-sm text-muted-foreground">
                De <span className="line-through">R$ 59,90</span> por apenas{" "}
                <span className="font-semibold text-primary">R$ 34,90</span>
              </p>
            </div>

            <ul className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground lg:justify-start">
              <li className="inline-flex items-center gap-1.5">
                <Mail className="h-4 w-4 text-primary" aria-hidden="true" /> Entrega no e-mail
              </li>
              <li className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-primary" aria-hidden="true" /> Acesso imediato
              </li>
              <li className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" /> Garantia de 7 dias
              </li>
            </ul>
          </div>

          <div className="w-full max-w-md flex-1">
            <div className="relative rounded-3xl bg-card p-3 shadow-2xl shadow-olive/10 ring-1 ring-border">
              <Image
                src="/devocional-mockup.png"
                alt="Devocional da Mãe que Não Desiste impresso sobre uma mesa de madeira ao lado de uma xícara de café"
                width={640}
                height={640}
                priority
                className="rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
