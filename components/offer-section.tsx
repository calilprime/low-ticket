import { BookOpen, CalendarDays, ListChecks, ScrollText, ShieldCheck, Lock } from 'lucide-react'
import { CheckoutLink } from '@/components/checkout-link'

/**
 * Estes são os 4 itens que o produto realmente entrega — os três "bônus"
 * são inserts do próprio PDF (páginas 13, 14 e 15). Não acrescentar nada
 * em áudio, vídeo ou aplicativo: não existe.
 */
const itens = [
  {
    icon: BookOpen,
    tag: 'Item principal',
    title: 'Devocional da Mãe Serena (PDF — 9 dias)',
    price: 'R$ 97,00',
    text: 'O plano completo e guiado para blindar suas emoções e restaurar a paz do seu lar, um dia de cada vez.',
  },
  {
    icon: CalendarDays,
    tag: 'Bônus 1',
    title: 'Planner Semanal da Família',
    price: 'R$ 27,00',
    text: 'Para parar de carregar a casa sozinha. Um mapa simples da semana para dividir tarefas com quem mora com você, sem virar cobrança.',
  },
  {
    icon: ListChecks,
    tag: 'Bônus 2',
    title: 'Checklist do Lar em Paz',
    price: 'R$ 37,00',
    text: 'As rotinas diárias e semanais que tiram o peso da casa das suas costas, em micro-hábitos que cabem na sua correria.',
  },
  {
    icon: ScrollText,
    tag: 'Bônus 3',
    title: 'Cartão de Entrega',
    price: 'R$ 17,00',
    text: 'Um espaço para escrever o que está pesando e entregar nas mãos de Deus, em vez de carregar a noite inteira.',
  },
]

export function OfferSection() {
  return (
    <section id="oferta" className="bg-background px-5 py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center font-serif text-2xl font-bold text-balance text-foreground sm:text-3xl md:text-4xl">
          Tudo o que chega no seu e-mail hoje
        </h2>

        <div className="mt-10 overflow-hidden rounded-3xl bg-olive text-olive-foreground shadow-2xl shadow-olive/20">
          <p className="bg-gold/15 px-6 py-3 text-center text-xs font-semibold tracking-[0.18em] text-gold uppercase">
            Pagamento único • Acesso vitalício
          </p>

          <div className="px-6 py-10 md:px-12 md:py-12">
            <ul className="grid gap-4">
              {itens.map(({ icon: Icon, tag, title, price, text }) => (
                <li
                  key={title}
                  className="rounded-2xl bg-olive-foreground/5 p-5 ring-1 ring-olive-foreground/10"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="text-xs font-semibold tracking-wide text-gold uppercase">
                      {tag}
                    </span>
                    <span className="ml-auto flex items-baseline gap-2 text-sm">
                      <span className="text-olive-foreground/60 line-through">{price}</span>
                      <span className="font-semibold text-gold">INCLUÍDO</span>
                    </span>
                  </div>
                  <h3 className="mt-3 font-serif text-lg font-semibold">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-olive-foreground/80">
                    {text}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col items-center border-t border-olive-foreground/15 pt-8">
              <span className="text-sm text-olive-foreground/70">
                Valor real de tudo: <span className="line-through">R$ 178,00</span>
              </span>
              <span className="mt-3 text-xs font-semibold tracking-[0.18em] text-gold uppercase">
                Hoje você leva por apenas
              </span>
              <span className="mt-1 font-serif text-5xl font-bold text-gold md:text-6xl">
                R$ 34,90
              </span>
              <span className="mt-1 text-sm text-olive-foreground/70">no PIX ou cartão</span>
            </div>

            <div className="mt-8 flex flex-col items-center">
              <CheckoutLink tone="gold">Quero me tornar uma Mãe Serena agora</CheckoutLink>
              <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-olive-foreground/70">
                <Lock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>Compra 100% segura • Entrega automática no seu e-mail</span>
              </p>
            </div>

            <div className="mx-auto mt-10 flex max-w-md items-start gap-4 rounded-2xl bg-olive-foreground/5 p-5 text-left ring-1 ring-olive-foreground/10">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold">
                <ShieldCheck className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <p className="font-serif text-base font-semibold">Garantia de 7 dias</p>
                <p className="mt-1 text-sm leading-relaxed text-olive-foreground/80">
                  Se achar que o devocional não trouxe paz para a sua rotina, basta mandar
                  um e-mail e devolvemos 100% do seu dinheiro, sem burocracia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
