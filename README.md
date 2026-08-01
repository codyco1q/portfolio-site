# Cody — Portfolio

Personal portfolio for **Cody (Moaz Shahin)**, AI Automation & Funnel Engineer. A dark, metallic single-page site built with React + Vite, featuring live funnels, automation case studies, a career timeline, a PDF resume viewer, and a Make.com-powered strategy call booking modal.

## Stack

- **Vite + React 19 + TypeScript**
- **Tailwind CSS v4**
- **GSAP + Lenis** — scroll-driven animations and buttery smooth scrolling
- **lucide-react** — icons
- **Space Grotesk** — display font (@fontsource)

## Getting started

```bash
npm install
npm run dev      # start dev server at http://localhost:5173/
npm run build    # type-check + production build
npm run lint     # oxlint
npm run preview  # preview the production build
```

## Booking webhook

The "Book an Automation Strategy Call" modal POSTs a JSON payload to a Make.com webhook.

```bash
# .env.local
VITE_MAKE_WEBHOOK_URL=https://hook.eu2.make.com/your-hook-id
```

Payload:

```json
{
  "name": "Full Name",
  "email": "person@domain.com",
  "date": "2026-08-05",
  "time": "14:00",
  "startDateTime": "2026-08-05T14:00:00",
  "notes": "Automation goals"
}
```

Make returns `200` on success to trigger the confirmation screen.

## Audit form webhook

The "Free Automation Audit" form in the CTA POSTs JSON to **FormSubmit** (`https://formsubmit.co/ajax/codyaxton@outlook.com`) — free, no backend, no Make.com scenario. Submissions arrive as emails to `codyaxton@outlook.com`.

> **First run:** submit the form once from the live site. FormSubmit sends a "Confirm your form" email to the inbox — click it once to activate. After that, every submission arrives automatically.

To override the endpoint (e.g. a Web3Forms access key later), set an env var:

```bash
# .env.local
VITE_AUDIT_WEBHOOK_URL=https://api.web3forms.com/submit
```

## Demo video

The "See It In Action" section renders a video when configured. Provide an MP4 or a YouTube ID:

```bash
VITE_DEMO_VIDEO_URL=https://cdn.example.com/demo.mp4   # or
VITE_DEMO_YOUTUBE_ID=dQw4w9WgXcQ
VITE_DEMO_LABEL="AI Voice Agent walkthrough"
```

Without a URL it shows a "request the private walkthrough" placeholder.

## OG image

`public/og-image.png` (1200×630) is generated from `scripts/generate-og.mjs`:

```bash
npm run generate:og
```

## Project structure

```
src/
  components/        Section components (Hero, Navbar, Stats, Funnels, CaseStudies, ...)
  App.tsx            Page composition + Lenis/GSAP setup
  index.css          Tailwind theme, fonts, animations
public/              favicon, resume PDF, OG image, 404 page
scripts/             asset generation (OG image)
```

## Headshot

Drop a square `public/headshot.jpg` to show it in the Hero (hidden until the file exists).

## Deploying

Build with `npm run build` and host the `dist/` folder anywhere (Vercel, Netlify, GitHub Pages, etc.).
