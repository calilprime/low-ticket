import { MessageCircle, Mail } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="bg-olive px-5 py-12 text-olive-foreground">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-serif text-lg font-semibold">Devocional da Mãe Serena</p>

        <div className="mt-6 flex flex-col items-center justify-center gap-3 text-sm sm:flex-row sm:gap-8">
          <a
            href="https://wa.me/5511940348916"
            className="inline-flex items-center gap-2 text-olive-foreground/90 transition-colors hover:text-gold"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Suporte no WhatsApp
          </a>
          <a
            href="mailto:devocionaldamaeserena@gmail.com"
            className="inline-flex items-center gap-2 text-olive-foreground/90 transition-colors hover:text-gold"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            devocionaldamaeserena@gmail.com
          </a>
        </div>

        <p className="mx-auto mt-8 max-w-xl text-xs leading-relaxed text-olive-foreground/60">
          Este é um produto digital entregue em formato PDF por e-mail. Não haverá envio de
          material físico. O conteúdo tem caráter devocional e de apoio espiritual, não
          substituindo acompanhamento profissional quando necessário.
        </p>

        <p className="mx-auto mt-4 max-w-xl text-xs leading-relaxed text-olive-foreground/50">
          Citações bíblicas extraídas da Almeida Revista e Corrigida (ARC), © 2009 Sociedade
          Bíblica do Brasil. Texto utilizado com autorização.
        </p>

        <p className="mt-6 text-xs text-olive-foreground/50">
          © {new Date().getFullYear()} Devocional da Mãe Serena. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  )
}
