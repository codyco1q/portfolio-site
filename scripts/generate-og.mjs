import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const fontPath = resolve(
  __dirname,
  '../node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2',
)
const fontB64 = readFileSync(fontPath).toString('base64')

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <style>
      @font-face {
        font-family: 'Space Grotesk';
        src: url('data:font/woff2;base64,${fontB64}') format('woff2');
        font-weight: 100 900;
      }
      .brand { font-family: 'Space Grotesk', 'Helvetica Neue', Helvetica, Arial, sans-serif; }
      .mono { font-family: ui-monospace, 'SF Mono', Menlo, Monaco, monospace; }
    </style>
    <linearGradient id="meta" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#e4e4e7" />
      <stop offset="1" stop-color="#71717a" />
    </linearGradient>
    <linearGradient id="title" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#fafafa" />
      <stop offset="0.55" stop-color="#ffffff" />
      <stop offset="1" stop-color="#a1a1aa" />
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0" r="0.85">
      <stop offset="0" stop-color="#71717a" stop-opacity="0.18" />
      <stop offset="1" stop-color="#0a0a0a" stop-opacity="0" />
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="#0a0a0a" />
  <rect width="1200" height="630" fill="url(#glow)" />

  <rect x="80" y="72" width="46" height="46" rx="13" fill="url(#meta)" />
  <text x="103" y="102" text-anchor="middle" class="mono" font-size="20" font-weight="700" fill="#09090b">&lt;/&gt;</text>
  <text x="146" y="103" class="brand" font-size="28" font-weight="700" fill="#e4e4e7">Cody</text>
  <text x="146" y="125" class="mono" font-size="12" letter-spacing="2" fill="#71717a">AI AUTOMATION &amp; FUNNEL ENGINEER</text>

  <g class="mono" font-size="15" fill="#71717a">
    <circle cx="1024" cy="100" r="5" fill="#34d399" />
    <text x="1038" y="105" text-anchor="start" fill="#a1a1aa">Open for new projects</text>
  </g>

  <text x="80" y="300" class="mono" font-size="14" letter-spacing="6" fill="#52525b">AUTONOMOUS SYSTEMS</text>
  <text x="80" y="382" class="brand" font-size="66" font-weight="700" letter-spacing="-1" fill="url(#title)">Autonomous Systems.</text>
  <text x="80" y="452" class="brand" font-size="66" font-weight="700" letter-spacing="-1" fill="url(#title)">Infinite Scalability.</text>

  <text x="80" y="506" class="brand" font-size="20" font-weight="300" fill="#a1a1aa">AI voice agents, automation engines, and high-converting</text>
  <text x="80" y="536" class="brand" font-size="20" font-weight="300" fill="#a1a1aa">funnels that run without you.</text>

  <line x1="80" y1="570" x2="1120" y2="570" stroke="#27272a" stroke-width="1" />
  <text x="80" y="596" class="mono" font-size="14" letter-spacing="1" fill="#71717a">Moaz Shahin (Cody) · October City, Egypt</text>
  <text x="1120" y="596" text-anchor="end" class="mono" font-size="14" letter-spacing="1" fill="#a1a1aa">codyco1q.github.io/portfolio-site</text>
</svg>
`

const out = resolve(__dirname, '../public/og-image.png')
await sharp(Buffer.from(svg)).png().toFile(out)
console.log('Wrote', out)
