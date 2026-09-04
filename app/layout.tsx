import Script from 'next/script'
import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

// Pixel compartilhado entre os produtos (mesmo ID configurado na oferta
// do Mãe Serena dentro da HeroSpark). Se um dia houver um pixel só deste
// produto, é só trocar aqui — e lembrar de trocar também no painel da
// HeroSpark, senão o checkout dispara para a conta errada.
const PIXEL_ID = '1380514643999534'

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
  title: 'Devocional da Mãe Serena | Plano de Oração de 9 Dias para Mães Exaustas',
  description:
    'Um plano de 9 dias com orações de 2 a 10 minutos para blindar suas emoções, desarmar o estresse e restaurar a paz do seu lar. Planner, Checklist e Cartão de Entrega inclusos.',
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: SITE_URL,
    siteName: 'Devocional da Mãe Serena',
    title: 'O plano de oração de 9 dias para mães exaustas',
    description:
      'Orações de 2 a 10 minutos por dia para trazer a paz de volta para a sua casa. Acesso imediato no e-mail, por R$ 34,90.',
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
      </body>
    </html>
  )
}
