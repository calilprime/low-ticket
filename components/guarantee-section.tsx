import { ShieldCheck } from "lucide-react"

export function GuaranteeSection() {
  return (
    <section className="bg-background px-5 pb-16 md:pb-24">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col items-center gap-6 rounded-[2rem] border-2 border-gold/40 bg-sand/60 p-7 text-center md:flex-row md:p-10 md:text-left">
          <span className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-cta/12 ring-4 ring-cta/25">
            <ShieldCheck className="h-10 w-10 text-cta" aria-hidden="true" />
          </span>
          <div>
            {/* Texto alinhado ao da LP do Mãe Serena. O anterior prometia
                garantia "incondicional", "sem perguntas" e "sem
                constrangimento" — promessas mais fortes do que a configuração
                da HeroSpark foi confirmada como sustentando. */}
            <h2 className="text-balance font-serif text-xl font-bold text-foreground sm:text-2xl">
              Garantia de 7 dias
            </h2>
            <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
              Faça as orações. Se dentro de 7 dias você achar que o devocional não te deu a direção que procurava,
              basta mandar um e-mail e devolvemos 100% do seu dinheiro, sem burocracia.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
