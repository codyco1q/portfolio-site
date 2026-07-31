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

## Project structure

```
src/
  components/        Section components (Hero, Navbar, Stats, Funnels, CaseStudies, ...)
  App.tsx            Page composition + Lenis/GSAP setup
  index.css          Tailwind theme, fonts, animations
public/              favicon, resume PDF
```

## Deploying

Build with `npm run build` and host the `dist/` folder anywhere (Vercel, Netlify, GitHub Pages, etc.).
