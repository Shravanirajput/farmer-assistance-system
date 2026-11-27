// Turns the Markdown documentation into web pages at /docs on the live site.
// Runs after `vite build` (see package.json) and writes into dist/docs:
//   README.md            -> /docs/                 (index)
//   docs/SETUP.md        -> /docs/setup.html      ... and the other guides
//   docs/images/*        -> /docs/images/*
//   docs/presentation/*  -> /docs/presentation/*  (+ /docs/presentation.html viewer)

import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Marked } from 'marked'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const out = resolve(root, 'dist/docs')
mkdirSync(out, { recursive: true })

const PAGES = [
  { source: 'README.md', file: 'index.html', label: 'Overview' },
  { source: 'docs/SETUP.md', file: 'setup.html', label: 'Setup' },
  { source: 'docs/FEATURES.md', file: 'features.html', label: 'Features' },
  { source: 'docs/ARCHITECTURE.md', file: 'architecture.html', label: 'Architecture' },
  { source: 'docs/DATA-SOURCES.md', file: 'data-sources.html', label: 'Data sources' },
  { source: 'docs/DEPLOYMENT.md', file: 'deployment.html', label: 'Deployment' },
  { source: 'docs/PRESENTATION-GUIDE.md', file: 'presentation-guide.html', label: 'Presentation guide' },
]
const DECK = 'presentation/Farmer-Assistance-Presentation'

const escapeHtml = (text) => text.replace(/[&<>"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[char])

// Point Markdown links at the generated pages instead of .md files.
function rewriteHref(href) {
  if (!href || /^(https?:|mailto:|tel:|#)/.test(href)) return href
  const [path, hash = ''] = href.split('#')
  const anchor = hash ? `#${hash}` : ''
  const clean = path.replace(/^\.?\/?(docs\/)?/, '')
  const page = PAGES.find((entry) => entry.source.replace(/^docs\//, '') === clean || entry.source === path)
  if (page) return page.file + anchor
  if (/^(\.\.\/)?README\.md$/.test(path)) return 'index.html' + anchor
  if (/^presentation\/?$/.test(clean)) return 'presentation.html'
  return clean + anchor
}

const marked = new Marked({
  gfm: true,
  renderer: {
    code(token) {
      const text = typeof token === 'string' ? token : token.text
      const lang = typeof token === 'string' ? arguments[1] : token.lang
      if (lang === 'mermaid') return `<pre class="mermaid">${escapeHtml(text)}</pre>`
      return `<pre><code>${escapeHtml(text)}</code></pre>`
    },
  },
  walkTokens(token) {
    if (token.type === 'link' || token.type === 'image') token.href = rewriteHref(token.href)
  },
})

const STYLE = `
:root{--mud:#6b3420;--mud-deep:#4a2214;--rice:#fbf5e9;--khadi:#f2ebdc;--paper:#fffcf6;--ink:#1f2a44;--haldi:#e9a319;--leaf:#2f6b3f;--line:#e0d3bc}
*{box-sizing:border-box}
body{margin:0;background:var(--khadi);color:var(--ink);font:17px/1.65 'Segoe UI','Nirmala UI',system-ui,sans-serif}
header{background:var(--mud);color:var(--rice);padding:18px 0 0}
.wrap{width:min(960px,100% - 32px);margin:0 auto}
.brand{display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap}
.brand strong{font:700 1.35rem Georgia,'Nirmala UI',serif}
.brand a{color:var(--rice)}
nav ul{list-style:none;display:flex;flex-wrap:wrap;gap:4px;margin:14px 0 0;padding:0}
nav a{display:block;padding:8px 12px;color:var(--rice);text-decoration:none;border-radius:8px 8px 0 0}
nav a[aria-current=page]{background:var(--khadi);color:var(--mud);font-weight:700}
main{background:var(--paper);border:1px solid var(--line);border-radius:14px;padding:28px clamp(18px,4vw,44px);margin:24px auto 48px}
h1,h2,h3{font-family:Georgia,'Nirmala UI',serif;line-height:1.25;color:var(--ink)}
h1{font-size:2.1rem;margin-top:0}
h2{margin-top:2.2rem;padding-top:.6rem;border-top:1px solid var(--line)}
a{color:var(--mud)}
img{max-width:100%;height:auto;border:1px solid var(--line);border-radius:10px}
table{border-collapse:collapse;width:100%;margin:1rem 0;font-size:.95rem;display:block;overflow-x:auto}
th,td{border:1px solid var(--line);padding:8px 10px;text-align:left;vertical-align:top}
th{background:#efe7d6}
code{background:#f1eadb;padding:1px 6px;border-radius:5px;font-size:.92em}
pre{background:#22352b;color:#fbf5e9;padding:14px 16px;border-radius:10px;overflow-x:auto}
pre code{background:none;padding:0;color:inherit}
pre.mermaid{background:#fff;color:var(--ink);border:1px solid var(--line);text-align:center}
blockquote{margin:1rem 0;padding:8px 16px;border-left:4px solid var(--haldi);background:#fbf1d6}
.deck{display:flex;gap:12px;flex-wrap:wrap;margin:16px 0}
.button{display:inline-block;padding:10px 18px;border-radius:10px;background:var(--haldi);color:var(--ink);font-weight:700;text-decoration:none}
.button.light{background:#efe7d6}
iframe{width:100%;height:80vh;border:1px solid var(--line);border-radius:10px;background:#fff}
footer{text-align:center;color:#6a6459;font-size:.9rem;padding-bottom:32px}
`

function layout({ title, current, body }) {
  const nav = [...PAGES.map((page) => ({ file: page.file, label: page.label })), { file: 'presentation.html', label: 'Slides' }]
    .map((item) => `<li><a href="${item.file}"${item.file === current ? ' aria-current="page"' : ''}>${item.label}</a></li>`)
    .join('')
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)} — Farmer Assistance docs</title>
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<style>${STYLE}</style>
</head>
<body>
<header><div class="wrap">
  <div class="brand"><strong>Farmer Assistance · शेतकरी सहाय्य — Docs</strong><a href="/">← Open the app</a></div>
  <nav aria-label="Documentation"><ul>${nav}</ul></nav>
</div></header>
<main class="wrap">${body}</main>
<footer>Farmer Assistance — student mini-project documentation</footer>
<script type="module">
  if (document.querySelector('.mermaid')) {
    const { default: mermaid } = await import('https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs')
    mermaid.initialize({ startOnLoad: false, theme: 'neutral' })
    await mermaid.run()
  }
</script>
</body>
</html>
`
}

for (const page of PAGES) {
  const markdown = readFileSync(resolve(root, page.source), 'utf8')
  const title = (markdown.match(/^#\s+(.+)$/m)?.[1] ?? page.label).trim()
  writeFileSync(resolve(out, page.file), layout({ title, current: page.file, body: marked.parse(markdown) }))
}

const deckBody = `
<h1>Presentation</h1>
<p>The project presentation (19 slides). View it below, or download the PowerPoint file with speaker notes.</p>
<div class="deck">
  <a class="button" href="${DECK}.pptx" download>Download PowerPoint (.pptx)</a>
  <a class="button light" href="${DECK}.pdf" target="_blank" rel="noreferrer">Open PDF in a new tab</a>
</div>
<iframe src="${DECK}.pdf" title="Farmer Assistance presentation"></iframe>
`
writeFileSync(resolve(out, 'presentation.html'), layout({ title: 'Presentation', current: 'presentation.html', body: deckBody }))

for (const folder of ['images', 'presentation']) {
  const source = resolve(root, 'docs', folder)
  if (existsSync(source)) cpSync(source, resolve(out, folder), { recursive: true })
}

console.log(`Docs built: ${PAGES.length + 1} pages in dist/docs`)
