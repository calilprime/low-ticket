/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Páginas de funil servidas como HTML estático (public/), com URL limpa.
  async rewrites() {
    return [
      { source: '/upsell', destination: '/upsell.html' },
      { source: '/downsell', destination: '/downsell.html' },
      // Quiz para o tráfego das imagens, e o painel dele.
      { source: '/quiz', destination: '/quiz.html' },
      { source: '/banco-quiz', destination: '/banco-quiz.html' },
    ]
  },
}

export default nextConfig
