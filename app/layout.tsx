import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter, Caveat } from 'next/font/google'
import './globals.css'

const PIXEL_ID = '1380514643999534'
const UTMIFY_PIXEL_ID = '6a96ff68a90cb454027c5cc4'
const CLARITY_ID = 'yfpyp5xcpn'

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

// Só os balões de margem usam esta face. Peso 700 apenas: um balão manuscrito
// em peso normal some no meio do texto e deixa de ler como recado.
const caveat = Caveat({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-caveat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Devocional da Mãe que Não Desiste | O Que Orar Quando Seu Filho Se Afasta',
  description:
    'Para a mãe que já não sabe o que orar pelo filho que se afastou. 9 dias, uma oração pronta por dia, sem brigar e sem se desesperar.',
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
    <html lang="pt-BR" className={`bg-background ${playfair.variable} ${inter.variable} ${caveat.variable}`}>
      <head>
        {/* Meta Pixel no <head>, fora do next/script.
            Com strategy="afterInteractive" ele só era baixado depois da
            hidratação do React. Medido em 13/09 num Chrome simulando celular
            com 4G fraco (150 ms RTT, 1,6 Mbps, CPU 4x): a página pintava em
            2,0 s e o PageView só saía em 4,5 s. Todo clique que desistia nesse
            intervalo virava clique sem LPV no Gerenciador.
            Aqui o snippet roda enquanto o HTML é lido. Ele não bloqueia nada:
            o fbevents.js continua sendo carregado com async. */}
        <link rel="preconnect" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://www.facebook.com" />
        <script
          id="fb-pixel"
          dangerouslySetInnerHTML={{
            __html: `
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
          `,
          }}
        />

        {/* Fila do Clarity. Precisa existir antes da hidratação: o ClarityTags
            chama window.clarity('set', ...) no mount e o goToCheckout chama
            window.clarity('event', ...). O snippet lazyOnload lá embaixo
            reaproveita esta fila (c[a] = c[a] || ...) e a esvazia ao carregar. */}
        <script
          id="clarity-fila"
          dangerouslySetInnerHTML={{
            __html: `window.clarity=window.clarity||function(){(window.clarity.q=window.clarity.q||[]).push(arguments)};`,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            alt=""
            src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>

        {/* UTMify — captura os UTMs do anúncio e casa a venda que chega pelo
            webhook da HeroSpark com o clique que a originou. É esta camada que
            reporta Purchase ao Meta pelo servidor, o que o pixel de navegador
            não consegue fazer quando a compra é no Pix (a confirmação chega
            depois que a compradora já fechou o navegador).
            Equivalente literal ao snippet ofuscado do painel: ele só define
            window.pixelId e carrega o pixel.js. */}
        <Script id="utmify-pixel-id" strategy="afterInteractive">
          {`window.pixelId = "${UTMIFY_PIXEL_ID}";`}
        </Script>
        <Script
          id="utmify-pixel"
          src="https://cdn.utmify.com.br/scripts/pixel/pixel.js"
          strategy="afterInteractive"
        />

        {/* Microsoft Clarity — replay de sessao, mapa de calor, rage click e
            dead click. Gratuito e ilimitado.
            lazyOnload (13/09): a cascata medida num Chrome simulando celular
            com 4G fraco mostrou o Clarity fazendo 5 requisições exatamente na
            janela em que o pixel da Meta baixa o signals/config — o último
            passo antes do PageView, que é o que vira LPV. Agora ele só carrega
            depois do load. A fila window.clarity está no <head>, então as
            tags de UTM do ClarityTags e o cta_click continuam registrados. */}
        <Script id="ms-clarity" strategy="lazyOnload">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_ID}");
          `}
        </Script>

        <Analytics />
      </body>
    </html>
  )
}