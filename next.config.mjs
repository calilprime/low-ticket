/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export estático: a LP não tem nada dinâmico (nenhuma rota de API, nenhum
  // dado buscado no servidor). Gera HTML puro em out/, que a Netlify serve
  // direto — sem runtime do Next, sem plugin, sem função serverless.
  // É o caminho de menor risco para um site que já está vendendo.
  //
  // As páginas estáticas do funil (upsell.html, downsell.html, quiz.html,
  // banco-quiz.html) vivem em public/ justamente para que o export as copie
  // para out/ e as URLs continuem funcionando. Se você mexer nelas, edite a
  // cópia em public/ — é ela que vai para o ar.
  output: 'export',

  typescript: {
    // Herdado do projeto de origem. Mantido para não divergir, MAS isso faz
    // o build ignorar erros de tipo — rode `npx tsc --noEmit` à parte antes
    // de publicar. Foi assim que o bug do acordeão passou despercebido.
    ignoreBuildErrors: true,
  },

  images: {
    // Obrigatório com output: 'export' — não há servidor para otimizar imagem.
    unoptimized: true,
  },
}

export default nextConfig
