import { Quote } from "lucide-react"

/**
 * Os três cards com ícone viraram três linhas.
 *
 * Não é economia de espaço por si: com 20% de profundidade média de rolagem no
 * Clarity, cada card que a mãe precisa passar antes da oferta é altura que ela
 * não percorre. O texto é o mesmo.
 */
const pains = [
  {
    title: "O silêncio dói.",
    text: "Você tenta puxar assunto, ele se fecha.",
  },
  {
    title: "A distância dentro de casa.",
    text: "O filho que você criou agindo como se você fosse estranha.",
  },
  {
    title: "A palavra que some.",
    text: "Querer clamar pela vida dele e não achar o que pedir.",
  },
]

export function PainSection() {
  return (
    <section className="bg-secondary px-5 py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <h2
          className="text-balance text-center font-serif text-2xl font-bold text-foreground sm:text-3xl md:text-4xl"
          data-reveal
        >
          Se a porta do quarto dele virou um muro, você não está sozinha
        </h2>

        <ul className="mt-10 grid gap-4" data-reveal>
          {pains.map(({ title, text }) => (
            <li key={title} className="border-l-[3px] border-rose/65 pl-3.5 text-sm leading-relaxed text-muted-foreground sm:text-base">
              <strong className="block font-bold text-foreground">{title}</strong>
              {text}
            </li>
          ))}
        </ul>

        <div className="mt-10 flex items-start gap-4 rounded-r-3xl border-l-4 border-primary bg-gold/16 p-6 md:p-7" data-reveal>
          <Quote className="mt-0.5 h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
          <p className="text-pretty font-serif text-base font-semibold leading-relaxed text-foreground sm:text-lg">
            O problema não é achar a palavra certa para falar com ele.{" "}
            <span className="grifo">É aprender o que falar com Deus enquanto ele não conversa com você.</span>
          </p>
        </div>

        {/* O contraste é sobre ELA — o que ela faz e o que ela sente. Nunca
            sobre o filho mudar de comportamento: essa é a promessa que o
            produto se recusa a fazer, e que a página 2 do PDF nega. */}
        <div className="mt-8 grid gap-3" data-reveal>
          <div className="rounded-3xl border border-dashed border-border bg-[color-mix(in_oklab,var(--foreground)_6%,var(--card))] p-5">
            <p className="text-[0.66rem] font-bold uppercase tracking-[0.16em] text-muted-foreground">Hoje</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Você senta para orar, abre a boca — e não sabe o que pedir.
            </p>
          </div>
          <div className="rounded-3xl border border-cta/40 bg-[linear-gradient(135deg,color-mix(in_oklab,var(--cta)_14%,var(--card)),var(--card))] p-5">
            <p className="text-[0.66rem] font-bold uppercase tracking-[0.16em] text-[oklch(0.62_0.17_150)]">
              A partir do Dia 1
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-foreground sm:text-base">
              Você abre a folha do dia e <strong className="font-bold">a oração já está ali, pronta</strong>. Bastam
              2 a 10 minutos.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
