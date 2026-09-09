import Script from 'next/script'
import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

// Pixel compartilhado entre os produtos (mesmo ID configurado na oferta
// do Mãe Serena dentro da HeroSpark). Se um dia houver um pixel só deste
// produto, é só trocar aqui — e lembrar de trocar também no painel da
// HeroSpark, senão o checkout dispara para a conta errada.
const PIXEL_ID = '1380514643999534'
const UTMIFY_PIXEL_ID = '6a96ff68a90cb454027c5cc4'
const CLARITY_ID = 'yfr5x008zd'

const SITE_URL = 'https://devocionalmaeserena.netlify.app'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Devocional da Mãe Serena | 9 Dias de Fé e Ordem para o Seu Lar',
  description:
    'Nove dias que unem oração e organização prática: um versículo, uma reflexão, uma oração pronta e um passo prático para a casa, em 10 a 15 minutos por dia. Planner, Checklist e Cartão de Entrega inclusos.',
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: SITE_URL,
    siteName: 'Devocional da Mãe Serena',
    title: 'Organize a casa e fortaleça a fé em 9 dias — um hábito por dia',
    description:
      'Uma oração e um passo prático para a sua casa por dia, em 10 a 15 minutos. Acesso imediato no e-mail, por R$ 34,90.',
    // capa.jpg é PNG (765x1024) apesar da extensão. É retrato, então o
    // preview no WhatsApp/Facebook sai cortado — vale gerar uma arte
    // 1200x630 dedicada e trocar aqui.
    images: [
      {
        url: '/capa.jpg',
        width: 765,
        height: 1024,
        alt: 'Devocional da Mãe Serena — capa do PDF de 9 dias',
      },
    ],
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#FDFBF7',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`bg-background ${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        {children}

        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            alt=""
            src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>

        {/* UTMify — captura os UTMs do anuncio e casa a venda que chega pelo
            webhook da HeroSpark com o clique que a originou. Desde que a API de
            Conversoes da HeroSpark foi desligada (ela duplicava o Purchase), esta
            e a UNICA fonte server-side de Purchase deste produto. O script tem que
            estar na pagina: e dele que sai o _fbp/_fbc que sustenta a qualidade
            de correspondencia do evento. */}
        <Script id="utmify-pixel-id" strategy="afterInteractive">
          {`window.pixelId = "${UTMIFY_PIXEL_ID}";`}
        </Script>
        <Script
          id="utmify-pixel"
          src="https://cdn.utmify.com.br/scripts/pixel/pixel.js"
          strategy="afterInteractive"
        />

        {/* Microsoft Clarity — replay de sessao, mapa de calor, rage click e
            dead click. Projeto proprio do Mae Serena, separado do Nao Desiste.
            Carrega com afterInteractive para nao competir com o first paint. */}
        <Script id="ms-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_ID}");
          `}
        </Script>
      </body>
    </html>
  )
}
