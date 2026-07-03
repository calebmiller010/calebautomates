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
`src/components/CTA.astro` is a focused, booking-first contact section: the **primary** action
is the Google Calendar booking link (`calendar.app.google/NUxmMR4GipiHsD7d9` — book a 20-min
call), with a **one-click prefilled email** (`mailto:` to `caleb@calebautomates.com`) as the
zero-friction fallback for people not ready to book. No embedded form / backend. Update the
booking URL or email in that one file if they change.

> The section renders on a **fixed dark band** (literal colors in `global.css`, not the
> `var(--color-text)` theme token) so it looks right in both light and dark mode. The earlier
> version tied the background to a theme var that inverted in dark mode and hid the text — if
> you ever restyle `#contact`, keep its colors literal, not theme-dependent.

> If you later want a real inline form that emails you without a client handoff, a free tier of
> **Web3Forms** or **Formspree** is a ~5-minute drop-in (single POST, one access key) — left
> out here on purpose since it needs your signup/key.
