# calebautomates.com redesign — adversarial review (pre-production)

Reviewed 2026-09-30, branch `accuracy-pass` @ `0094cb8` (7 commits over `main`). Built `dist/` with `npx astro build` (15 pages, clean). Runtime checks against the owner's dev server (:4321) via headless-Chrome screenshots at 1280 (`shots/adversary/*.png`) and live DOM measurement in the Browser pane at a real 1280×900 and 375×812 viewport. Nothing under `src/` was edited.

## Verdict

**Two blockers, both mechanical CSS fixes (≤10 min total).** Every hard constraint passes: honesty facts, no last name anywhere in `dist/`, exact h1, fonts, no `<em>` accents, no headshot, no referral fee, the two required claims present, every CTA on `links.ts`, quiz/calculator/demo/theme all working, no console errors, no broken links, nothing lost to the CSS prune. The blockers are a 375px horizontal overflow on the homepage and a zero-padding regression on all 10 case-study/blog pages — both severe enough that they should not reach production, both one-line fixes.

---

## BLOCKER

### B1 — Homepage scrolls horizontally at 375px (19px overflow)
- **Where:** `src/styles/global.css:178` (`.btn{…white-space:nowrap}`) inherited by `.btn--link` (`:184`); triggered by `src/components/CaseStudyPreview.astro:40` — `<a class="btn btn--link">Read the full case study — with the system diagram →</a>`.
- **Failure:** measured at a real 375×812 viewport: the link is 349px wide starting at x=45 → right edge 394px; `document.scrollWidth = 394`, `clientWidth = 375`. The whole homepage pans sideways on every phone. Only the homepage is affected (quiz overrides `white-space:normal` locally; advisors/portfolio/blog measured at 375 = no overflow).
- **Fix:** add `white-space:normal;text-align:left` to `.btn--link` in `global.css:184` (link-style buttons should wrap; only pill buttons need nowrap). Then delete the now-redundant `white-space: normal` on `.quiz-deeper-link` (`AutomationQuiz.astro`). Re-measure `document.documentElement.scrollWidth` at 375 = 375.

### B2 — Case-study and blog-post pages have 0px top/bottom padding (10 of 15 pages)
- **Where:** `src/pages/portfolio/[...slug].astro:67` and `src/pages/blog/[...slug].astro:54`. `main` had `#case-detail{padding-block:clamp(var(--space-12),7vw,var(--space-20))}`; the redesign deleted it, and the new global rhythm is `section{padding-block:var(--section-y)}` — but these pages use `<article>`, not `<section>`, so nothing applies.
- **Failure:** measured: `#case-detail` computed `padding-top: 0px; padding-bottom: 0px`; gap nav→"← All case studies" = **0px**; gap CTA→footer = **0px**. Visible in `shots/adversary/case-1280.png` and `post-1280.png` (back-link touching the nav border, "Book a 20-minute call" touching the footer rule).
- **Fix:** either `article{padding-block:var(--section-y)}` next to the `section` rule in `global.css` (cleanest, matches the one-rhythm goal) or `#case-detail, #post-detail { padding-block: var(--section-y); }` in the two page styles.

---

## WARN

1. **Hero h1 wraps to three lines at 1280** — `global.css:165` `.title--hero{max-width:16ch}` was sized for the proposal's shorter headline; with the owner's "Systems that run your business without you." it measures 468px wide, 3 lines at 60px (`shots/adversary/home-1280.png`). The proposal explicitly targeted two lines at 1280. Fix: `max-width:22ch` (≈640px → balanced two lines "Systems that run your / business without you.").
2. **Section h2 max-width forces 3 lines** — `global.css:166` `.title--section{max-width:22ch}` → "One system, running unattended since early 2026" renders as 3 lines at 464px (`caseH2Lines: 3`). Fix: `max-width:26ch`, or shorten to "Running unattended since early 2026".
3. **`li{max-width:68ch}` truncates ruled lists** — `global.css:75` caps every `li` at 68ch. `.calc-pains li` = 642px inside an 832px `.calc-familiar` (the hairlines stop 190px short of the calculator card's right edge, visible in home-1280.png); `.svc-row` = 642px inside the 832px `.svc-list`. Fix: `.calc-pains li,.svc-row{max-width:none}` (the advisors page already does this for `.adv-facts li` / `.adv-step`).
4. **"0 hrs manual work per week" vs "one human approval step"** — `CaseStudyPreview.astro:21`, `church-automation-pipeline.mdx:4,8` ("Zero manual hours per week"). Same card says "nothing goes out without a person approving it". Pre-existing on `main`, but it is the one place the site contradicts itself and the approval step is now hero copy. Suggest "Minutes" / "≈0 hrs" with label "Manual work per week (one approval tap)". Owner's call.
5. **`public/sitemap.xml` is stale** — missing `/advisors/` (new on this branch), `/portfolio/volunteer-scheduling-system/`, `/portfolio/contractor-website-lead-capture/`, `/portfolio/fintech-integration-platform/`, `/portfolio/internal-ai-config-tool/`. Add the five `<url>` entries (P2-5 notes the static-sitemap situation).
6. **Tap targets under 44px in the nav** — `global.css:186` `.btn--sm{min-height:40px}` (nav "Book a call", measured 40px at 375) and `:95` `.theme-toggle` 36px (visible 680–1024px, i.e. tablets). Proposal P0-4 asked for 44. Fix: `.btn--sm{min-height:44px;padding:0 var(--space-4)}`, `.theme-toggle{width:44px;height:44px}` (or 40 with a 44 hit-area via padding).
7. **Advisors hero CTA label is a third variant** — `advisors.astro:64` "Grab 20 minutes with me". Proposal fixed advisors at "Book a time" / "or make an intro by email". Two different primary labels on the same page ("Grab 20 minutes with me" at top, "Book a time" in the coffee card). Pick one.
8. **Pending demo steps fail AA** — `WatchItWork.astro:88` `.wiw-step{opacity:.6}` on muted text → 2.47:1 light / 2.74:1 dark (computed from tokens). It's a deliberate "not yet run" state, but the labels are readable content. Fix: keep `color:var(--color-text-muted)` and drop opacity to `.85`, or use opacity only on the dot.
9. **Dark-mode flash + no persistence** (pre-existing, unchanged) — `Base.astro:19` ships `data-theme="light"` and the toggle script runs at the end of `<body>`; dark-preference users get a light flash on every page load and a manual toggle is forgotten on navigation. Move a 3-line inline script into `<head>` and mirror the choice to `localStorage`.

---

## NIT

- `global.css` leftovers from the prune: `.hero-proof` (:112, unused), `#services{}` (:117, empty), `.metric-label`/`.step-num`/`.step-text` (:122–126, unused), `.credentials`/`.credential` (:140–141, unused; About uses `.about-creds`), `.cta-sub` (:150, duplicated in `CTA.astro`), empty `── PROBLEM/EXPERIENCE/PROCESS/ANIMATIONS ──` headers (:114/130/132/158), the "Legacy aliases" comment with nothing under it (:188), `--color-text-faint`/`--color-text-inverse` tokens now unused (:15–16, :56–57), `.btn--secondary`/`.container--wide` never used.
- `CTA.astro:20` hardcodes "or email me →" instead of `CTA_EMAIL` from `links.ts`.
- Hero has two `.hero-note` paragraphs (guarantee + proof line, `Hero.astro:17–18`); proposal §4 asked for one proof sentence under the buttons. Fine, but it's the one place the hero runs long on a phone.
- Contractor case study says "29-page site" / metric "29" (`contractor-website-lead-capture.mdx:4,8`); the live site's sitemap lists 27 URLs. "10 service-area towns" verified (10 town pages). Either count the two non-sitemap pages explicitly or say "nearly 30".
- `CostCalculator.astro` `.calc-pains li` hairlines: see WARN 3.
- Tailwind still emits ~20 unused utilities (`.flex`, `.hidden`, `.grid`…) from content scanning of prose words; harmless (`corePlugins.preflight` is off). Could set `content: []` since no utilities are used.
- `_design-review/PROPOSAL.md` is committed in `0094cb8`; `shots/` is gitignored. Intentional? It's harmless but ships review notes into the repo history.

---

## Hard constraints — evidence

| Check | Result |
|---|---|
| Last name in `dist/` (html/css/js/xml, incl. JSON-LD + meta, case-insensitive) | **0 hits** (`founder.name: "Caleb"`, byline "By Caleb") |
| `$10M`, "lead architect", "zero paying", "since 2022", "independent since", "full-time", "currently employed", employer names, "referral fee", "headshot", "weeks → automatic" in `dist/` | **0 hits** ("employee work"/"employer's team" appear only as past-tense framing in the church blog post) |
| Fintech facts | "technical lead" everywhere; savings = "projected by the company … millions a year"; mapping → "reviewable draft" / "review step" ✓ |
| Healthcare facts | ~1M requests/day "helped build and run", HIPAA+GDPR; 80% / 60% attributed to the healthcare company ✓ |
| Church / scheduling / Ferry | 200+, 40+ week 1, ~1 hr/month, early 2026, one approval; scheduling system; Ferry site (10 towns verified against live sitemap) ✓ |
| h1 text | exactly "Systems that run your business without you." (site + OG image) ✓ |
| Fonts | Source Serif 4 600 / Source Sans 3 400/500/600 loaded; all h1/h2 computed `"Source Serif 4" 600 normal`; `h1 em, h2 em, h3 em, .title em` = 0 in DOM; quiz JS strings stripped of `<em>` ✓ |
| Headshot / referral fee | none ✓ |
| "Most automations are built and running within a week" / "No long-term contracts" | present, `FirstAutomation.astro:36` ✓ |
| CTAs | 10 homepage CTAs + advisors/portfolio/blog/quiz/footer all resolve to `BOOKING_URL` or `mailto:caleb@calebautomates.com` from `links.ts`; quiz uses `define:vars` ✓ |
| Quiz | endpoint `https://api.web3forms.com/submit` + key `5353a62b-…` byte-identical to `main`; `LOAD_BANDS…estB` block diff = only the `CHECK_SVG` const and mailto address source. Walked A (5 q → "The Copy-Paste Report Ritual", ~720–1,345 hrs / $25,000–$47,000, `.stat` at 30px serif) and B (SVG checkboxes render + fill teal on select, Continue enables, itemized result, "Show the math", share). `is:global` styles present ✓ |
| Calculator | `recompute()` diff vs `main` = mailto address source only; 5 h/wk → 240 hrs / $8,400, mailto body prefilled; `.stat` 30px serif (was 16–18px) ✓ |
| WatchItWork in `<details>` | opened, clicked Run: 5 steps `.done`, `#wiw-result` unhidden ✓ |
| Theme toggle | desktop button flips `data-theme` + aria-label; mobile-menu `data-theme-label` button flips "Dark mode"→"Light mode" and syncs the desktop icon ✓ |
| Internal links | crawler over 15 pages: 0 broken hrefs, 0 missing anchors ✓ |
| Console | 0 errors on /, /quiz/ (full walkthrough), /advisors/, /portfolio/church-automation-pipeline/ ✓ |
| Dead-CSS prune | every class in built markup and every JS-string class (`class="…"`, `classList`, `querySelector`) has a rule except pure structural hooks (`calc-metric, case-metric, case-sep, svc-body, wiw, wiw-col, quiz-result, post-prose, nav-mobile-btn, portfolio-card-title, portfolio-metric-num`) — none of which had styling on `main` that mattered. `:global` uses (FAQ `.faq-a :global(a)`, quiz `is:global`) intact. Markdown/MDX only uses `.prose` + the imported components ✓ |
| Contrast (tokens, both themes) | muted 5.41/5.52 on bg, 5.51/5.25 on surface; primary 5.97/5.47; button text 5.97/5.47; band button 6.90, band link 8.80, band muted 8.57; quiz error red 5.03/6.55 ✓ (only failures: WARN 8) |
| Inline `style=""` / literal hexes in components | 0 inline styles; hexes only the quiz error red (`#c0392b`/`#e57f72`) and band tokens ✓ |
| 375px | no overflow on quiz/advisors/case pages; wordmark one line (27px tall, 17px); menu items 44px; hamburger 44px; primary buttons 44px. Homepage: **B1** |

## Proposal conformance (skipped or deviated)
- P0-6 headshot: skipped by owner decision ✓ (no placeholder rendered).
- P0-5 advisors labels: deviated (WARN 7).
- P0-4 tap targets: `.btn--sm` 40 / toggle 36 (WARN 6); "Free Quiz" dropped from top nav, kept in menu + footer ✓.
- §2c hero at 1280: three lines (WARN 1).
- P1-3 one rhythm: articles missed (B2).
- Everything else in P0/P1 and P2-1/2/4 landed.
