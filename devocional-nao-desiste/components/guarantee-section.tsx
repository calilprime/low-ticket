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
            <h2 className="text-balance font-serif text-xl font-bold text-foreground sm:text-2xl">
              Garantia incondicional de 7 dias — o risco é todo nosso
            </h2>
            <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
              Leia, ore, aplique. Se em 7 dias você sentir que não te ajudou em nada, é só mandar uma mensagem e
              devolvemos os R$ 34,90 integralmente. Sem perguntas, sem burocracia, sem constrangimento. Ou seja: você
              não arrisca nada — quem arrisca somos nós.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
