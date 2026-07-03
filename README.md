# calebautomates.com

Marketing + portfolio site for Caleb's automation consulting practice. Rebuilt from a
single hand-maintained `index.html` into **Astro** (2026-07-03) for maintainability and a
content-driven portfolio. Design (Instrument Serif + DM Sans, teal palette, light/dark) is
preserved verbatim from the original.

## Stack
- **[Astro 4](https://astro.build)** — static output, zero JS shipped except the small theme/
  reveal script and the Tally embed.
- **Tailwind** (`@astrojs/tailwind`, Preflight off) — utilities layered over the existing
  CSS-variable design system in `src/styles/global.css`.
- **MDX content collection** (`@astrojs/mdx`) — the portfolio.

## Develop
```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # → dist/  (static)
npm run preview   # serve the built dist/
```

## Deploy (Vercel) — ⚠️ one setting change needed
The Vercel project is currently configured with **Framework Preset = "Other"** (it served the
old raw `index.html`). Before the first Astro deploy, in the Vercel dashboard →
Project → Settings → Build & Deployment:
- **Framework Preset:** `Astro`
- **Build Command:** `astro build` (or leave default)
- **Output Directory:** `dist`

`vercel.json` in this repo already declares `framework: astro` / `outputDirectory: dist`, so a
fresh import would auto-detect correctly — but an existing project keeps its dashboard preset
until you change it. **Until the preset is flipped, do not merge this to the production branch**
— the "Other" preset would try to serve the repo root and break the live site.

## Add a portfolio case study
Drop a new `.mdx` file in `src/content/portfolio/` — no layout code to touch:
```mdx
---
title: Short punchy title
client: Client name or anonymized descriptor
summary: One–two sentence teaser (shows on the grid).
order: 2                # lower = earlier
featured: false
metrics:
  - { value: "80%", label: "Less manual work" }
tags: ["Integration", "Runs unattended"]
published: true
---

Markdown body — `## headings`, lists, **bold** all styled automatically.
```
It appears on `/portfolio/` and gets its own `/portfolio/<filename>/` page.

## Structure
```
src/
  layouts/Base.astro        # <head>, fonts, nav+footer, theme + scroll-reveal scripts
  components/                # one .astro per homepage section (ported verbatim) + CTA.astro
  content/portfolio/*.mdx    # case studies (content collection; schema in content/config.ts)
  pages/
    index.astro              # homepage (composes the section components + CTA)
    portfolio/index.astro    # case-study grid
    portfolio/[...slug].astro# case-study detail
  styles/global.css          # design tokens (light/dark) + all section styles
public/favicon.svg
_legacy/index.legacy.html    # the original single-file site, archived for reference
```

## CTA / lead capture
`src/components/CTA.astro` is the dual-path contact section: the **primary** action is the
Google Calendar booking link (`calendar.app.google/NUxmMR4GipiHsD7d9` — book a 20-min call),
with the Tally form (`tally.so/r/Xx1aAO`) as the lower-friction "describe your task" fallback.
Update the booking URL in that one file if it ever changes.
