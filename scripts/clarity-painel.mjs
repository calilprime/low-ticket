#!/usr/bin/env node
/**
 * Puxa o Data Export do Clarity e gera um painel HTML local.
 *
 *   node scripts/clarity-painel.mjs
 *
 * O token sai de CLARITY_TOKEN ou do arquivo .clarity-token na raiz do
 * projeto (ambos fora do git). Gere em clarity.microsoft.com >
 * Settings > Data Export > Generate new API token, com o projeto do
 * Nao Desiste selecionado.
 *
 * Por que gerar HTML com os dados embutidos, e nao uma pagina que busca a
 * API no navegador: a API do Clarity nao manda cabecalho de CORS, entao
 * fetch de dentro de uma pagina e barrado. E o token nao pode ir parar em
 * codigo que roda no navegador de qualquer forma.
 *
 * Tetos da API, que moldam o desenho deste script:
 *   - 10 requests por projeto por dia. Este script gasta 2 por execucao.
 *   - So da para pedir as ultimas 24, 48 ou 72 horas. Nao existe historico.
 *     Por isso cada execucao grava um snapshot em data/clarity/, e o painel
 *     monta a serie historica a partir dos snapshots acumulados.
 *   - Resposta limitada a 1.000 linhas, sem paginacao.
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..')
const pastaDados = join(raiz, 'data', 'clarity')
const saidaHtml = join(raiz, 'painel-clarity.html')

const ENDPOINT = 'https://www.clarity.ms/export-data/api/v1/project-live-insights'
const CLARITY_PROJECT_ID = 'yfpyp5xcpn'

function pegarToken() {
  if (process.env.CLARITY_TOKEN) return process.env.CLARITY_TOKEN.trim()

  const arquivo = join(raiz, '.clarity-token')
  if (existsSync(arquivo)) return readFileSync(arquivo, 'utf8').trim()

  console.error(
    [
      '',
      'Falta o token do Clarity.',
      '',
      '  1. Abra https://clarity.microsoft.com, entre no projeto do Nao Desiste',
      '  2. Settings > Data Export > Generate new API token',
      '  3. Salve o token em .clarity-token na raiz deste projeto',
      '     (o arquivo ja esta no .gitignore)',
      '',
    ].join('\n'),
  )
  process.exit(1)
}

async function buscar(token, params) {
  const url = new URL(ENDPOINT)
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))

  const resposta = await fetch(url, {
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
  })

  if (resposta.status === 429) {
    throw new Error(
      'A API recusou: limite de 10 requests por dia estourado. ' +
        'Tente amanha, ou abra o painel com os snapshots que ja existem.',
    )
  }
  if (resposta.status === 401 || resposta.status === 403) {
    throw new Error('Token invalido, expirado ou sem permissao. Gere outro em Settings > Data Export.')
  }
  if (!resposta.ok) {
    throw new Error(`A API respondeu ${resposta.status}: ${await resposta.text()}`)
  }

  return resposta.json()
}

function salvarSnapshot(dados) {
  mkdirSync(pastaDados, { recursive: true })
  const agora = new Date().toISOString().replace(/[:.]/g, '-')
  const caminho = join(pastaDados, `${agora}.json`)
  writeFileSync(caminho, JSON.stringify(dados, null, 2), 'utf8')
  return caminho
}

function lerSnapshots() {
  if (!existsSync(pastaDados)) return []
  return readdirSync(pastaDados)
    .filter((f) => f.endsWith('.json'))
    .sort()
    .map((f) => ({ arquivo: f, dados: JSON.parse(readFileSync(join(pastaDados, f), 'utf8')) }))
}

// --- Render -----------------------------------------------------------------

const esc = (v) =>
  String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

/**
 * Renderiza generico: para cada metrica, uma tabela com as colunas que
 * vierem. A doc avisa que a resposta pode trazer metricas e dimensoes alem
 * das documentadas, entao nada aqui assume um formato fixo.
 */
function tabelaMetrica(metrica) {
  const linhas = Array.isArray(metrica.information) ? metrica.information : []
  if (!linhas.length) return `<p class="vazio">Sem dados para ${esc(metrica.metricName)} nesta janela.</p>`

  const colunas = [...new Set(linhas.flatMap((l) => Object.keys(l)))]
  const numerica = (v) => v !== '' && v !== null && !Number.isNaN(Number(v))

  return `
    <div class="rolagem">
      <table>
        <thead><tr>${colunas.map((c) => `<th>${esc(c)}</th>`).join('')}</tr></thead>
        <tbody>
          ${linhas
            .map(
              (l) =>
                `<tr>${colunas
                  .map((c) => {
                    const v = l[c]
                    const num = numerica(v)
                    const texto = num ? Number(v).toLocaleString('pt-BR', { maximumFractionDigits: 2 }) : esc(v ?? '—')
                    return `<td class="${num ? 'num' : ''}">${texto}</td>`
                  })
                  .join('')}</tr>`,
            )
            .join('')}
        </tbody>
      </table>
    </div>`
}

function secao(titulo, subtitulo, payload) {
  const metricas = Array.isArray(payload) ? payload : []
  if (!metricas.length) return ''

  return `
    <section class="bloco">
      <h2>${esc(titulo)}</h2>
      <p class="sub">${esc(subtitulo)}</p>
      ${metricas
        .map(
          (m) => `
        <details>
          <summary>${esc(m.metricName)} <span class="contagem">${(m.information || []).length} linhas</span></summary>
          ${tabelaMetrica(m)}
        </details>`,
        )
        .join('')}
    </section>`
}

function historico(snapshots) {
  const linhas = snapshots
    .map(({ arquivo, dados }) => {
      const trafego = (Array.isArray(dados.geral) ? dados.geral : []).find((m) => m.metricName === 'Traffic')
      const info = trafego?.information?.[0] ?? {}
      return {
        quando: arquivo.replace('.json', '').replace('T', ' ').slice(0, 16),
        sessoes: info.totalSessionCount ?? '—',
        bots: info.totalBotSessionCount ?? '—',
        usuarios: info.distantUserCount ?? '—',
      }
    })
    .reverse()

  if (!linhas.length) return ''

  return `
    <section class="bloco">
      <h2>Histórico dos snapshots</h2>
      <p class="sub">A API só entrega as últimas 72h. Esta série existe porque cada execução guarda um snapshot — quanto mais você rodar, mais histórico tem.</p>
      <div class="rolagem">
        <table>
          <thead><tr><th>Snapshot</th><th>Sessões (24h)</th><th>Bots</th><th>Usuários</th></tr></thead>
          <tbody>
            ${linhas
              .map(
                (l) =>
                  `<tr><td>${esc(l.quando)}</td><td class="num">${esc(l.sessoes)}</td><td class="num">${esc(l.bots)}</td><td class="num">${esc(l.usuarios)}</td></tr>`,
              )
              .join('')}
          </tbody>
        </table>
      </div>
    </section>`
}

function montarHtml({ geral, porCampanha, snapshots }) {
  const agora = new Date().toLocaleString('pt-BR')
  const base = `https://clarity.microsoft.com/projects/view/${CLARITY_PROJECT_ID}`

  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Painel Clarity — Não Desiste</title>
<style>
  :root {
    color-scheme: light;
    --fundo: #FDFBF7; --carta: #fff; --borda: #e7e1d6; --texto: #2b2a26;
    --suave: #6f6a5f; --destaque: #6b7f4f; --alerta: #b4632a;
  }
  * { box-sizing: border-box; }
  body { margin: 0; padding: 32px 20px 64px; background: var(--fundo); color: var(--texto);
    font: 15px/1.6 ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif; }
  .capa { max-width: 1040px; margin: 0 auto; }
  h1 { font-size: 1.6rem; margin: 0 0 4px; }
  .carimbo { color: var(--suave); font-size: .85rem; margin: 0 0 28px; }
  .bloco { background: var(--carta); border: 1px solid var(--borda); border-radius: 16px;
    padding: 20px 22px; margin-bottom: 18px; }
  h2 { font-size: 1.05rem; margin: 0 0 4px; }
  .sub { color: var(--suave); font-size: .85rem; margin: 0 0 14px; }
  details { border-top: 1px solid var(--borda); padding: 10px 0 2px; }
  summary { cursor: pointer; font-weight: 600; font-size: .92rem; }
  .contagem { color: var(--suave); font-weight: 400; font-size: .8rem; margin-left: 6px; }
  .rolagem { overflow-x: auto; margin-top: 10px; }
  table { border-collapse: collapse; width: 100%; font-size: .85rem; }
  th, td { text-align: left; padding: 7px 10px; border-bottom: 1px solid var(--borda); white-space: nowrap; }
  th { color: var(--suave); font-weight: 600; font-size: .78rem; text-transform: uppercase; letter-spacing: .04em; }
  td.num { text-align: right; font-variant-numeric: tabular-nums; }
  .vazio { color: var(--suave); font-size: .85rem; }
  .aviso { border-left: 4px solid var(--alerta); background: #fdf4ec; }
  .aviso h2 { color: var(--alerta); }
  .aviso ul { margin: 8px 0 0; padding-left: 18px; }
  .aviso li { margin-bottom: 6px; }
  a { color: var(--destaque); }
</style>
</head>
<body>
<div class="capa">
  <h1>Painel Clarity — Devocional da Mãe que Não Desiste</h1>
  <p class="carimbo">Gerado em ${esc(agora)} · projeto <code>${esc(CLARITY_PROJECT_ID)}</code> · dados em UTC</p>

  <section class="bloco aviso">
    <h2>O que este painel não mostra</h2>
    <p class="sub">A Data Export API só devolve as dimensões padrão (Campaign, Source, Medium, Channel, Device, OS, País, URL). Ela <strong>não</strong> expõe custom tags nem custom events.</p>
    <ul>
      <li><strong>Tags de UTM por criativo</strong> (<code>utm_content</code>) e o evento <strong><code>cta_click</code></strong> existem, mas só se leem no painel da Microsoft:
        <a href="${base}/recordings">Recordings</a> ·
        <a href="${base}/heatmaps">Heatmaps</a> ·
        <a href="${base}/dashboard">Dashboard</a>
      </li>
      <li>Em Recordings, abra <em>Filters → Custom tags</em> e escolha <code>utm_content</code>, <code>cta_origin</code> ou <code>traffic</code>. O <code>cta_click</code> aparece em <em>Filters → Smart events</em>.</li>
      <li><strong>Venda é número da HeroSpark.</strong> Clarity não vê checkout: ele mede até o clique, não a compra.</li>
    </ul>
  </section>

  ${secao('Visão geral — últimas 24h', 'Sem quebra por dimensão. É o retrato do dia inteiro.', geral)}
  ${secao('Por campanha — últimas 24h', 'Quebra por Campaign e Source: qual campanha traz quem rola e quem clica com raiva.', porCampanha)}
  ${historico(snapshots)}

  <section class="bloco">
    <h2>Como atualizar</h2>
    <p class="sub">Rode de novo e recarregue esta página. São 2 requests por execução, de um teto de 10 por dia.</p>
    <div class="rolagem"><table><tbody>
      <tr><td><code>node scripts/clarity-painel.mjs</code></td></tr>
    </tbody></table></div>
  </section>
</div>
</body>
</html>`
}

// --- Execucao ---------------------------------------------------------------

async function main() {
  const token = pegarToken()

  console.log('Buscando visão geral (últimas 24h)...')
  const geral = await buscar(token, { numOfDays: '1' })

  console.log('Buscando quebra por campanha...')
  const porCampanha = await buscar(token, { numOfDays: '1', dimension1: 'Campaign', dimension2: 'Source' })

  const caminho = salvarSnapshot({ capturadoEm: new Date().toISOString(), geral, porCampanha })
  console.log(`Snapshot salvo em ${caminho}`)

  writeFileSync(saidaHtml, montarHtml({ geral, porCampanha, snapshots: lerSnapshots() }), 'utf8')
  console.log(`\nPainel gerado: ${saidaHtml}`)
  console.log('Abra no navegador (start painel-clarity.html no Windows).')
}

main().catch((erro) => {
  console.error(`\n${erro.message}\n`)
  process.exit(1)
})
