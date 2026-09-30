# calebautomates.com — design review & site-wide proposal

Reviewed 2026-09-30 on branch `accuracy-pass` (dev server :4321), light + dark, desktop + real 375px emulation. Screenshots in `_design-review/shots/`. Proposal only; nothing under `src/` was touched.

---

## 1. Verdict (5 lines)

1. **The bones are good.** Quiet palette, honest copy, a real calculator and a real case study, native `<details>` FAQ, working dark mode, a sound tokens file. This is not a template problem; it is a polish-and-restraint problem.
2. **The heading pattern is the biggest tell.** 13 of 14 headings are "plain line `<br>` *italic teal line*" in a condensed serif, plus pill eyebrows with dots. Swapping the fonts alone won't fix it; the *pattern* has to go with them.
3. **The homepage is ~12,000px and tells the career story four times** (hero stat strip, Experience, About, FAQ #1) and has three different "big number" strips. A CEPA scrolling on a phone will not reach About, where the person actually is.
4. **Nine primary-button implementations, eleven CTA labels, two different destinations** (hero → `#contact`, everything else → the booking link). Small things, but exactly the inconsistencies Caleb's eye catches.
5. **Three real defects:** muted body text fails AA in both themes (4.03 / 4.10; "faint" labels are 1.82:1 and carry the honesty labels on portfolio cards), the calculator's result numbers render at 16px because `--text-3xl/--text-5xl` don't exist, and the mobile nav wraps "Caleb / Automates" onto two lines.

---

## 2. Typography implementation plan

Decision is fixed: **Source Serif 4 (600, normal width, no italics) for headings; Source Sans 3 for body.** Here is how to land it in one pass.

### 2a. Font loading — `src/layouts/Base.astro`

Replace the Instrument Serif / DM Sans `<link>` with:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,600&family=Source+Sans+3:wght@400;500;600&display=swap" rel="stylesheet" />
```

Notes: request **only** weight 600 of the serif (no italic axis, so an accidental `<em>` can't synthesize a real italic; browsers will fake-slant, which is the tripwire you want). `opsz 8..60` keeps the optical-size axis so large sizes get the display cut automatically (`font-optical-sizing: auto` is the default; leave it). Sans at 400/500/600: nav links use 500, buttons/labels 600.

### 2b. Tokens — `src/styles/global.css` `:root`

```css
--font-display:'Source Serif 4',Georgia,'Times New Roman',serif;
--font-body:'Source Sans 3','Helvetica Neue',Arial,sans-serif;
--display-weight:600;
--display-tracking:-0.015em;   /* only at >= --text-xl; 0 below */
```

Mirror in `tailwind.config.mjs` `theme.extend.fontFamily` (display/body) so any utility stays in sync.

### 2c. Type scale (replace the current `--text-*` block)

Source Serif 4 is ~15–20% wider than Instrument Serif, so every display size comes **down**; otherwise the hero wraps to three lines at 1280. Source Sans 3 has a slightly smaller x-height than DM Sans, so body goes up one notch.

| Token | Value | Used for |
|---|---|---|
| `--text-xs` | `0.8125rem` (13px, no clamp) | eyebrows, metric labels, footnotes |
| `--text-sm` | `clamp(.9375rem, .9rem + .2vw, 1rem)` | nav, buttons, card body, FAQ answers |
| `--text-base` | `clamp(1.0625rem, 1rem + .3vw, 1.1875rem)` | body copy |
| `--text-lg` | `clamp(1.1875rem, 1.05rem + .6vw, 1.375rem)` | hero sub, page intros, card titles (serif) |
| `--text-xl` | `clamp(1.5rem, 1.2rem + 1.1vw, 2rem)` | h2 inside cards, blog/case titles in lists, stat numbers |
| `--text-2xl` | `clamp(1.875rem, 1.3rem + 1.9vw, 2.625rem)` | section h2, interior-page h1 |
| `--text-hero` | `clamp(2.375rem, 1.1rem + 3.9vw, 3.75rem)` | homepage h1 only (max 60px, was 88px) |

Remove `--text-4xl/5xl` references (CostCalculator, AutomationQuiz) — use `--text-2xl` for the result numbers.

Line-heights: hero `1.08`, `--text-2xl` `1.12`, `--text-xl` `1.2`, serif card titles `1.25`, body `1.6` (was 1.65–1.75 in five different places; pick 1.6 body / 1.5 small and delete the per-component overrides).

### 2d. One heading system (delete the per-component variants)

Add to global.css and use everywhere:

```css
.title{font-family:var(--font-display);font-weight:var(--display-weight);color:var(--color-text);text-wrap:balance}
.title--hero{font-size:var(--text-hero);line-height:1.08;letter-spacing:var(--display-tracking);max-width:16ch}
.title--section{font-size:var(--text-2xl);line-height:1.12;letter-spacing:var(--display-tracking);max-width:22ch}
.title--card{font-size:var(--text-xl);line-height:1.2}
.title--small{font-size:var(--text-lg);line-height:1.25}
.eyebrow{font-family:var(--font-body);font-size:var(--text-xs);font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--color-text-muted);margin-bottom:var(--space-3)}
.lede{font-size:var(--text-lg);color:var(--color-text-muted);line-height:1.5;max-width:54ch}
.stat{font-family:var(--font-display);font-weight:var(--display-weight);font-size:var(--text-xl);line-height:1;font-variant-numeric:tabular-nums;color:var(--color-text)}
```

Then map: `h1.hero-title`→`.title .title--hero`; `.section-title`, `.case-detail-title`, `.post-title`, advisors/portfolio/blog h1 → `.title--section`; `.case-study-title`, `.fa-title`, `.adv-h2`, `.adv-cta-h`, `.quiz-title`, `.quiz-q`, `.quiz-arch`, `.cta-headline` → `.title--card`; `.portfolio-card-title`, `.blog-card-title`, prose `h2` → `.title--small`; `.problem-label`, `.hero-eyebrow`, `.case-section-label`, `.wiw-col-label`, `.stack-label`, `.means-title`, `.fa-badge`, `.post-badge` → `.eyebrow`; `.proof-number`, `.metric-number`, `.calc-metric-number`, `.quiz-metric-num`, `.cdm-num`, `.portfolio-metric-num`, `.adv-num`, `.process-num` → `.stat`.

### 2e. What replaces the `<em>` accent

Nothing decorative replaces it. The rule: **one heading, one sentence, one colour, no `<br>`.** Where a heading currently needs two lines to make its point, the second line becomes a `.lede` paragraph in muted sans under it. Concrete rewrites (structure/tone only, no new claims):

| Where | Now | Proposed |
|---|---|---|
| Hero | Optimize the work.<br>*Scale the business.* | **Systems that run the business without you in the room.** + lede (current hero-sub, trimmed to one sentence) |
| Problem | You're running the business.<br>The business is *running you.* | **Sound familiar?** (the list carries it) |
| Calculator | See the price tag on<br>*"we've always done it this way."* | **What the manual way costs** |
| Case study | A real system.<br>*Running in production.* | **One system, running unattended since early 2026** |
| Watch it work | Don't take my word for it.<br>*Watch a manual task run itself.* | **Watch one run** |
| Services | Three types of systems.<br>*One outcome: less manual work.* | **What I build** |
| Experience | I don't just know automation tools.<br>*I know how businesses actually break.* | (merged into About, see §4) |
| Process | From problem to<br>*running system* in days. | **How it goes** |
| About | I build for outcomes,<br>*not for show.* | **About Caleb** (yes, a name; it's the personable page) |
| CTA band | Find your easiest<br>*automation win.* | **Start with a 20-minute call.** |
| Advisors h1 | The systems specialist<br>*on your bench.* | **A systems specialist for the owners you advise.** |
| Portfolio h1 | Systems that are *still running.* | **Systems that are still running.** (plain, same words) |
| Quiz h1 | What's all that manual work *really costing you?* | same words, plain |

Safety net while markup is being cleaned (keeps a missed `<em>` from going italic-teal): `h1 em,h2 em,h3 em,.title em{font-style:normal;color:inherit}`. The quiz injects `<em>` from JS in three strings (`AutomationQuiz.astro` lines ~212, ~240, ~262) — strip the tags there, not just in CSS.

Also delete: `.hero-eyebrow` pill + `::before` dot; `.case-badge` pill (all five portfolio cards say "CASE STUDY"; the page is called Portfolio); `.process-num` italic; the "Illustrative demo" inline pill (make it the `.wiw-note` text it already has).

---

## 3. Prioritized changes

Effort: S ≤ 1 h, M = half a day, L = a day+. Everything in P0 is ~2 days total.

### P0 — before the CEPA meeting (Wednesday)

| # | Change | Why | Files | Effort |
|---|---|---|---|---|
| **P0-1** | **Typography swap + kill the accent pattern** exactly as §2. | The single thing that moves "AI-sloppy" to "established". | `Base.astro`, `global.css`, `tailwind.config.mjs`, every `src/components/*.astro`, `src/pages/**`, quiz JS strings | **M** |
| **P0-2** | **Fix contrast tokens.** Light: `--color-text-muted:#66655f` (5.4:1), keep `--color-text-faint` for *decorative* use only (dots, dividers) and move every *text* use of it (`.problem-label`, `.service-examples`, `.portfolio-client`, `.case-detail-client`, `.post-byline`, `.case-section-label`, `.wiw-col-label`, `.stack-label`, `.wiw-step`) to muted. Dark: `--color-text-muted:#8f8e8b` (5.5:1). Primary-button text: use `var(--color-bg)` in both themes (5.97 / 5.47) instead of `--color-text-inverse` (4.34 in dark). Delete `--quiz-muted` (it exists only because muted was too light). | Muted body copy is most of the site and fails AA (4.03/4.10). The 1.82:1 faint labels include the honesty labels ("Volunteer project", "Engineering career") that *must* be legible. | `global.css` tokens; grep `text-faint` and `--quiz-muted` | **S** |
| **P0-3** | **Calculator result numbers.** `.calc-metric-number` references undefined `--text-3xl/--text-5xl` → renders at body size (verified 16–18px). Use `.stat` at `--text-2xl`. | The page's primary conversion hook shows its payoff in tiny type. | `CostCalculator.astro` | **S** |
| **P0-4** | **Mobile nav.** `.nav-logo{white-space:nowrap}`; below 680px hide `.theme-toggle` (or put a "Dark mode" row in the menu panel) and shrink `.nav-cta` padding to `var(--space-2) var(--space-4)`; menu links `min-height:44px`. Consider dropping "Free Quiz" from the top nav (it's linked from the calculator) so desktop nav is 5 items. | At 375px the wordmark wraps to two lines and the bar is 90px tall with four competing controls. Menu links are 39px (below 44px tap target). | `Nav.astro`, `global.css` nav block | **S** |
| **P0-5** | **One button system, two CTA labels.** In global.css: `.btn` (inline-flex, `min-height:44px`, `font:600 var(--text-sm) var(--font-body)`, `border-radius:var(--radius-full)`, gap `--space-2`) with `.btn--primary` (bg primary, text `--color-bg`, hover `--color-primary-hover`), `.btn--secondary` (1px `--color-border`, text `--color-text`), `.btn--link` (text link with arrow), `.btn--sm` (nav). Delete `.calc-book-btn`, `.fa-btn`, `.cta-book-btn`, `.wiw-run`, `.quiz-book`, `.quiz-next`, `.quiz-lead-btn`, `.nav-cta`, `.btn-ghost`. Labels: primary is always **"Book a 20-minute call"** → `BOOKING_URL` (`target=_blank rel=noopener`); secondary is always **"or email me →"** (mailto). Nav CTA becomes "Book a call". Hero primary currently goes to `#contact` while every other primary goes to the calendar — make the hero go to the calendar too and keep `#contact` for the nav secondary. Advisors keeps its two variants ("Book a time" / "or make an intro by email") because the audience differs. Move `BOOKING_URL` and `MAILTO` to `src/lib/links.ts` (currently pasted in 7 files). | 9 button classes, 11 labels, 2 destinations; every hover is different (some lift, some shadow, some fade). | `global.css`, all components/pages with a CTA | **M** |
| **P0-6** | **Headshot slot with graceful fallback.** New `src/components/Headshot.astro` that at build time checks for `public/caleb.jpg` (`fs.existsSync`) and renders `<img>` (4:5, `border-radius:var(--radius-lg)`, 160px wide on mobile, 200px desktop, `loading="eager"` in hero) — or renders **nothing** (no monogram, no placeholder box). Place it in three spots, in this order of value: (1) **/advisors "Let's get coffee" card**, left of the text; (2) **homepage About**, replacing the "What working with me looks like" card's top; (3) hero, only if Caleb likes it there after seeing (1). Layouts use `grid-template-columns:auto 1fr` so the absence collapses cleanly. | "Very personable" with no face anywhere. A CEPA who met him in person should recognise him on the page. Coffee-invite next to a face is the strongest single frame on the site. | new component; `advisors.astro`, `About.astro`, optionally `Hero.astro` | **S** (once the photo exists) |
| **P0-7** | **/advisors polish.** (a) "How a referral works": make it a single vertical numbered list (`max-width:46rem`), not a 3+1 auto-fill grid — step 4 orphans at desktop and step 3's title wraps. (b) Add a **"Who you'd be introducing"** strip directly under the hero: headshot + three plain facts pulled from existing copy ("Nine years building production software in healthcare and fintech" / "One person — you and your client talk to the builder" / "Kansas City; happy to meet in person"). No new claims. (c) "What I do for your clients" 2×2 cards → a 4-item definition list (bold title + one line), no cards. (d) Move "Let's get coffee" up to sit right after "How a referral works"; "I stay in my lane" goes last (it's reassurance, not the ask). (e) Add the `<meta name="description">` line to the page's OG title so a forwarded link previews as "For advisors…" — already there; just verify `public/og-image.png` isn't the old "AI automation" art (I couldn't view it). | The page is already well-scoped and stays out of "exit consultant" territory. It needs to feel like a person, and the referral steps must read at a glance. | `advisors.astro` | **S–M** |
| **P0-8** | **Quick homepage cuts** (the full re-order is P1; these are the ones that hurt most and take minutes): hero stat strip (`.hero-proof`) → one sentence under the buttons: "Nine years building production software in healthcare and fintech; now systems for small businesses and local organizations in Kansas City. [See the work →]" (numbers move into About's collapsed history, §4); case-study card: drop the right column's "Built for a business like yours" + "What this means for your business" (the "volunteer project I built for free… imagine what I'd build" line undercuts the professional register) — keep title, one paragraph, three metrics, "The result", link; CTA band: drop `.cta-assurances` (all three are restated within 200px); Process: drop the section, fold the four steps as a numbered list into the First Automation card ("How it goes"). | Big-number strip + uppercase labels is the "trust badge" trope Caleb hates, and "Millions/yr" isn't a number. Process cards orphan (3+1) and duplicate the offer card. | `Hero.astro`, `CaseStudyPreview.astro`, `CTA.astro`, `Process.astro`, `FirstAutomation.astro`, `index.astro` | **S** |

### P1 — soon

| # | Change | Why | Files | Effort |
|---|---|---|---|---|
| P1-1 | **Homepage section order** per §4 (Problem merged into Calculator; Experience merged into About behind `<details>`; Watch-it-work collapsed). | 12 → 7 sections; the person and the proof are reachable on a phone. | `index.astro` + the merged components | M |
| P1-2 | **Extract the 34 inline `style=""` attributes** (About 13, CaseStudyPreview 9, Experience 5, others 7) into classes; delete `.means-card` (teal-tinted card with uppercase title = the one loud element on the page). | Tokens exist; inline styles bypass them and dark mode. | those components | S |
| P1-3 | **One section rhythm.** Replace the 11 different `padding-block: clamp(...)` variants with `section{padding-block:var(--section-y)}` where `--section-y:clamp(3.5rem,7vw,6rem)`, and `.section--tight` (`clamp(2rem,4vw,3.5rem)`) for the offer card and CTA band. Header-to-content gap is always `--space-10`. | Spacing drift is the kind of thing Caleb notices and can't name. | `global.css`, all `<style>` blocks | S |
| P1-4 | **Remove the JS scroll-reveal** (IntersectionObserver in `Base.astro`) and the hero `fade-up` stagger. | "Just works": content shouldn't depend on JS to be visible (every screenshot of a mid-page section came back blank until the observer fired). Also removes 15 lines of script. | `Base.astro`, `global.css` animations block, hero classes | S |
| P1-5 | **Focus + tap targets.** `input:focus{outline:none}` in CostCalculator and the quiz kills the keyboard ring; use `outline:2px solid var(--color-primary);outline-offset:2px` (or just let the global `:focus-visible` through). All text-links used as CTAs (`.calc-email-link` 23px, `.cta-email-link`, `.adv-link`) get `min-height:44px;display:inline-flex;align-items:center`. | AA keyboard + touch. | `CostCalculator.astro`, `AutomationQuiz.astro`, link classes | S |
| P1-6 | **Services without cards.** Three rows: serif `.title--small`, one-line description, one "e.g." line in muted; hairline between rows; no icons, no boxes. Add a 4th row only if it's real (it isn't; keep three). | Symmetric three-icon-card grid is the trope; the content is fine. | `Services.astro` | S |
| P1-7 | **Portfolio/blog list polish.** Remove "CASE STUDY" pill from every card and from the case-detail header (it sits on the same line as "← All case studies"); client label to muted; case-detail and post pages share one `.prose` block instead of two copies of the same 15 rules. | Redundant labels, duplicated CSS. | `portfolio/index.astro`, `portfolio/[...slug].astro`, `blog/[...slug].astro`, `global.css` | S |
| P1-8 | **Footer as the contact card.** Add `caleb@calebautomates.com` (mailto) and "Book a call" as plain links, plus "For advisors". | Right now the only contact method that isn't a button is buried in a mailto. A footer with an email is the most "real person" thing a site can do. | `Footer.astro` | S |

### P2 — later

| # | Change | Why | Files | Effort |
|---|---|---|---|---|
| P2-1 | Tokenise the CTA band (`--band-bg`, `--band-text`, `--band-accent`) instead of literal hexes; keep it theme-fixed (that decision was right). | Hexes in a component are a trap for the next edit. | `CTA.astro`, `global.css` | S |
| P2-2 | Quiz visual pass with the new system (`.btn`, `.title`, `.stat`); `.quiz-opt.multi::before` unicode circles → an SVG checkbox. | Quiz is fine functionally; bring it in line once the system exists. | `AutomationQuiz.astro` | M |
| P2-3 | Move `WatchItWork` to its own `/demo/` page (or the portfolio index) linked from Services, if the collapsed version in §4 feels buried. | Decide after seeing the collapsed version. | new page | S |
| P2-4 | Blog post typography: prose h2 → `.title--small`, blockquote without italics, code blocks styled (none yet). | Consistency once posts get traffic. | `blog/[...slug].astro` | S |
| P2-5 | Replace the static `public/sitemap.xml` when Astro is upgraded (comment in `astro.config.mjs`). | Housekeeping. | config | S |

---

## 4. Proposed homepage order (12 → 7)

| # | Section | Action | Reason |
|---|---|---|---|
| 1 | **Hero** | **Keep, trim.** Plain h1 (§2e), one-sentence lede, primary + "See the work" link, the one-line "9 years… Kansas City" proof sentence, optional headshot. No pill, no stat strip. | First screen should say who, for whom, and what happens next — nothing else. |
| 2 | **What it costs** (Calculator) | **Merge Problem into it.** The five pain items become a short muted list above the inputs ("Sound familiar? · Copying data between apps · …"), and the calculator's "The manual task" placeholder cycles through them. Keep the calculator card as is (after P0-3). | Problem's only job is to set up the calculator; as its own section it's a full screen of restatement. |
| 3 | **Proof** (Case study) | **Keep, trimmed** (P0-8). One card: title, one paragraph, three metrics, "The result", link. Follow with a one-line "More: [scheduling system] · [contractor site] · [fintech platform]" link row to /portfolio/. | This is the credibility section for both audiences; make it dense, not long. |
| 4 | **What I build** (Services) | **Keep, de-card** (P1-6), with **Watch-it-work collapsed** beneath it as `<details><summary>See an example run</summary>…</details>`. | Services answers "what"; the demo answers "show me" for the curious without costing a screen for everyone else. |
| 5 | **Start here** (First Automation + Process) | **Merge.** The offer card gains a four-line "How it goes" numbered list. | Offer and process are the same story told twice. |
| 6 | **About Caleb** (About + Experience) | **Merge.** Headshot, three short paragraphs (the current About body, minus the sentence that repeats the case study), the five credential lines, then `<details><summary>The longer version — nine years of production systems</summary>` containing the Experience prose (with the ~1M/day, "millions a year", FHIR/HL7, 80%/60% facts). Drop "What working with me looks like" card and the teal "What this means for you" card. | The person should be one section, not two plus a stat strip. Progressive disclosure keeps the receipts for the CEPA who wants them without making everyone scroll past them. |
| 7 | **FAQ** | **Keep as is** (already collapsed). Move the advisor question to the top of the list for the next two weeks. | It's the best-written section on the site. |
| 8 | **CTA band** | **Keep, trim** (P0-8). Heading, one sentence, primary + email link. | It's the close; assurances above it already did the reassuring. |
| — | Footer | Contact card (P1-8). | — |

Cut outright: **Problem** (merged), **Experience** (merged), **Process** (merged), **Watch-it-work** as a section (collapsed). Nothing is deleted from the repo; components either merge or become a `<details>` body.

---

## 5. What I would deliberately NOT change

- **The teal.** `#01696f` / `#4f98a3` pass on both backgrounds, it's distinctive without being loud, and nothing else on the page competes with it. Keep it, and keep it for links, primary buttons and nothing else.
- **The warm off-white/near-black palette and the surface/surface-2 layering.** It already reads as "not a template"; the fonts and headings were undermining it.
- **The theme-fixed dark CTA band.** The comment in `global.css` explains why it's literal-coloured; the reasoning holds. Tokenise later (P2-1), don't make it follow the theme.
- **The calculator and the quiz as the conversion mechanics**, and the "arithmetic on your own inputs" honesty framing in both.
- **The copy voice.** Plain, first person, no hype, the "or tell you straight there's nothing worth building" line. Every rewrite above is structural; the sentences stay his.
- **Native `<details>` for FAQ/menu** and the no-framework, inline-script approach. Right choice for a site this size; extend it (About history, demo) rather than adding hydration.
- **The /advisors page's positioning.** "I stay in my lane", "not the deal", no valuation claims — exactly right for CEPAs. Don't add exit-planning vocabulary beyond "easier to hand off".
- **Left-aligned, single-column layouts with `max-width` on prose.** Don't centre anything except the CTA band.
- **The contractor-site and fintech case studies' honesty labels.** Make them legible (P0-2), never remove them.

---

### Appendix — measured facts behind the verdict

- Contrast (WCAG): light muted `#7a7974` on bg **4.03**, faint `#bab9b4` **1.82**; dark muted **4.10**, faint **2.58**; dark primary-button text **4.34**. Proposed: light muted `#66655f` **5.41**, dark muted `#8f8e8b` **5.52**, button text = `--color-bg` **5.97 / 5.47**.
- `.calc-metric-number` computed font-size: **18px desktop, 16px mobile** (should be ~42px).
- Mobile (375px, real emulation): no horizontal overflow; wordmark wraps; hero h1 44.8px; menu links 39px tall; theme toggle 36px; `.calc-email-link` 23px.
- Inventory: 17 eyebrow labels, 13 `<em>` accent headings, 34 inline `style=""`, 9 primary-button classes, 11 distinct CTA labels, 11 section-padding variants, `BOOKING_URL` duplicated in 7 files.
- Homepage height at 1280px: ~12,000px (production: ~7,200px).
- The Astro dev toolbar shows at the bottom of every dev screenshot; it is not on the site.
