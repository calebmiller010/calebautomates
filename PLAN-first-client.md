# calebautomates.com → First-Client Engine: Execution Blueprint

**Branch reality:** Work is on `conversion-inbound-overhaul` (current). Fold everything here; it supersedes `astro-rebuild`. Deploy blocker still live: Vercel preset must be **Astro** (not "Other") before merge to `main`, or the live site breaks.

**Governing principle (from all three critiques):** Optimize for the stranger *already on the site*, not the stranger who isn't. Cold email is warming ~2 more weeks; content/SEO won't rank inside the first-client window. So: **fix trust today, ship one conversion lever this week, treat content as a background drip that never blocks.** And the hardest constraint wins every tie: **no fabrication.** Where the strategy docs proposed invented pricing history, effort track records, or a "normal rate" to discount from, those are cut below.

---

## 1. Build Order (ranked by time-to-first-client)

### PHASE 0 — Liability removal (do in the next hour, before anything else)
**All four findings blocks independently flagged this — highest confidence, highest severity.**

1. **Kill the fabricated/overclaimed metrics.** Single-file trust fix, ship standalone.
   - `Experience.astro`: delete "estimated to save around $10 million per year," "the client onboarding bottleneck," "I've worked directly with large business clients." Rewrite as **employment history** (see §2).
   - `About.astro`: "saved businesses millions" → scale/reliability framing tied to employers, not a savings claim.
   - `Hero.astro`: "one client's weekly routine" → "the church's weekly routine" (or genericize). Never imply a client exists.
   - **Lint pass:** grep all site copy for plural `clients?` describing consulting work, and for every `$` figure + every number. Each survivor must trace to (a) the church system (real, volunteer) or (b) a named past employer (Cerner). Anything else is deleted. This is a literal pre-commit checklist item, not an intention.

### PHASE 1 — Convert the visitor who's already here (this week)

2. **Reorder the existing page.** Near-zero build cost, highest structural leverage. Proof before credentials:
   `Hero → Problem → CostCalculator → CaseStudy → Services(offers) → Guarantee → Process → Experience+About(combined) → FAQ → CTA`
   Rationale: a stranger doesn't care about Cerner until they believe the offer solves *their* problem.

3. **Build the ROI calculator** (`CostCalculator.astro`). The #1 net-new build — the only asset that's genuinely differentiated, works on zero traffic (converts the one person Caleb links directly), and carries zero fabrication risk (output is the visitor's own arithmetic). Full spec in §4. Half-day build.

4. **Rewrite Services into named, scoped offers** (§3) — but with **effort framed as a personal estimate, not a track record** (see honesty note). Kills the "generic 3-bucket" problem.

5. **Combined trust section + Guarantee block + FAQ** (§2, §6). Collapse the three proposed trust sections into: one honest credibility block (folds "no clients yet" into it), one standalone guarantee card, one 4–5 question FAQ. Halves the copywriting without losing the trust-repair function.

6. **Swap primary CTA** to "Get your free Automation Teardown" with an intake step; keep a lightweight "just book a call" secondary for high-intent visitors. Guarantee caption under the button.

7. **SEO/meta hygiene** (§5) — file it under "today" not "someday" because the **OG image** matters *immediately* for any link Caleb shares on LinkedIn or in a cold-email follow-up. `robots.txt`, `sitemap.xml` (`@astrojs/sitemap`), canonical tag, OG/Twitter tags, one `Person`/`ProfessionalService` JSON-LD. ~1 hour.

### PHASE 2 — The strangers-find-him engine (starts now, never a blocker)

8. **Stand up blog infrastructure** — `blog` collection in `src/content/config.ts`, `src/pages/blog/index.astro`, `src/pages/blog/[...slug].astro` (mirror the existing `portfolio/[...slug].astro` pattern). ~1–2 hrs one-time.

9. **Publish ONE pillar post** — the church deep-dive (§5, article #2). It's a rewrite of material Caleb already has, and it's the internal-link hub every future post points to.

10. **Publish articles #1 and #3** (the "Silo Tax" + the self-audit) next, then drip the remaining 7 at one per 1–2 weeks.

### DEFERRED (do NOT let these eat Phase 1)
- Web3Forms integration → mailto-only for v1; upgrade only once traffic justifies it.
- JSON-LD `Article` schema → wait until 3+ posts exist.
- "Ongoing Care" retainer as a site tier → verbal answer only (see §3 kill).
- Analytics custom events on the calculator → small follow-up ticket, not critical path.

---

## 2. Homepage Conversion Changes

### Hero
- **Keep** the H1 "Your busywork, automated." — it's a fine top-line hook.
- **Rewrite subhead to name the reader's world** (pick one, don't stack):
  > "I build custom automations for small businesses — the kind of system that turns a recurring manual task (data entry, follow-ups, reports, document handoffs) into something that just runs, unattended, in the background."

  *Alt (sharper, credibility-forward):* "I find the 5 hours a week your business is losing to manual work — and automate it away. You talk to the person who writes the code."
- **Relabel the stat block** so it can't misread as three separate proofs. Micro-label above the stats: **"From one real system, in production since early 2026."** Owns the single-data-point fact instead of letting the reader discover it.
- **Fix the stat copy:** "one client's weekly routine" → "the church's weekly routine."
- **Caption under the CTA button:** "Free 20-min call · no cost to find out if it's worth it."

### Section reorder (final flow)
`Hero → Problem → Cost Calculator → Case Study → Services (offers) → Guarantee → Process → Experience + About (combined) → FAQ → CTA`

Note the compression: **Experience and About become ONE combined credibility stop**, not three separate scroll-stops. The critiques agreed the full stacked page is too long for a first-time visitor with a specific pain point.

### Problem section
Keep the 5 pain bullets. Add a `→ see how` inline anchor on the document/reports bullet that jumps to `#case-study` — turns generic pain copy into a breadcrumb to the one real proof.

### Experience (rewritten as employment history)
- Header: **"9 Years Building Systems That Can't Go Down."**
- Body: "At Cerner (now Oracle Health), I built FHIR-based healthcare data services handling roughly 1 million API requests a day, and led our team's GDPR compliance work — the kind of system where a bug doesn't just look bad, it violates federal healthcare regulation. I also owned PCI-compliant payment integrations, where the standard isn't 'works most of the time,' it's 'passes an audit.'"
- Replace the $10M line with a scale/reliability statement, no dollar figure: "One integration platform I built replaced weeks of manual file-mapping per new customer with an automated process — the bottleneck that quietly eats an engineering team's month, every month."

### New: Combined honesty + credibility (folded, NOT a standalone confession section)
The skeptical-owner critique is right that a dedicated "Honest Version" block near the top reads as nervous over-explaining. **Fold the zero-clients disclosure into the FAQ** (the "why should I be your first" answer is the best copy in the whole plan) and into one calm About line — do not give it its own headline near the top of the funnel.

### New: Guarantee / risk-reversal block (its own card, right before CTA area)
> **The guarantee:** In 20 minutes, I'll tell you one of two things — exactly where you can get at least 5 hours a week back, or honestly that there's nothing here worth your time right now. Either way, you'll know. No pitch, no pressure, no cost.

Keep the existing three assurance bullets below it. **Do NOT add** the vague "I'm open to milestone-based payment / structuring so you don't carry the risk" hedge — it reads as desperate. The clean 50%-on-delivery structure (stated at proposal time, not on the homepage) is the risk-reversal.

### New: FAQ (`FAQ.astro`, native `<details>/<summary>`, zero JS) — 4–5 entries only
Keep it short; a wall of rebuttals signals a page working too hard. Ship these four:

1. **"You don't have any paying clients yet — why should I be your first?"** (the best copy on the site)
   > "I don't, yet — and I'm not going to pretend otherwise. What I have is 9 years building production systems where failure was expensive — healthcare data platforms handling about a million requests a day, and PCI-compliant payment systems. And I have one system running unsupervised in production right now (the case study above), which I built and still maintain for free because I wanted to prove it could run without me. Being an early client isn't a downside you're absorbing — it's leverage: you get my full, direct attention, and I'm personally on the hook for your result."
2. **"What does this cost?"** → depends on the automation; you get a fixed scope and price before any build; the call is free with no obligation. *(No number on the homepage — see §3.)*
3. **"How long does a project actually take?"** → "Most of what I build is running within a week or two of us agreeing on scope. Nothing here is a multi-month engagement."
4. **"What if you build it and then it breaks and I can't reach you?"** → designed to run without you; if it breaks, you reach out and I fix it — you have my direct contact, not a routing queue.

*(Cut "is my data safe" as standalone — folds into the process answer; naming it plants a worry nobody raised. Add it back only if it comes up.)*

---

## 3. The Entry Offer(s)

**Two tiers on the site. The third is verbal only.**

### Front door: "Automation Teardown" — free
Renames the current "book a call" and gives it a tangible deliverable. Buyer fills a 3-question intake (what's the repetitive task, how often, how many people touch it) → then sees the booking calendar. Caleb reviews one workflow and delivers a **short written teardown by email** (where the manual steps are, roughly how many hours/week, whether it's automatable, rough shape of a fix, honest recommendation including "not worth it yet"). **Procedural, never scored/graded** — a zero-track-record consultant grading a business reads as presumptuous. The guarantee lives here.

- **Primary CTA everywhere:** "Get your free Automation Teardown" → intake → `calendar.app.google/NUxmMR4GipiHsD7d9`
- **Secondary (high-intent):** plain "Book a 20-min call" that skips the intake.

### The product: "First Automation Sprint" — fixed scope
One workflow automated end-to-end, fixed scope defined at the end of the Teardown call, 50% up front / 50% on delivery-and-acceptance. Deliverable = the working automation deployed + a one-page "how it runs / how to turn it off" doc + a short post-launch tweak window.

### HONEST PRICING GUIDANCE (this is where the strategy docs overreached — corrected)

The critiques are unanimous and correct here, so the blueprint diverges from the strategy docs:

- **KILL "founder pricing / below my normal rate."** There is no normal rate — Caleb has never charged a consulting client. You can't discount from a baseline that doesn't exist as lived fact.
- **KILL the flat "$1,500 First Sprint" anchor and the "$1,500–$4,000 / typically 3–7 days" table.** "Typically" invents a delivery track record he doesn't have; a hard price on a stranger's site contradicts the "no price pre-proposal" constraint and reads as a commodity menu or a bait number.
- **KILL "Ongoing Automation Care" as a site tier.** No retainer client, no operating history — a priced tier reads as an active offering. Verbal answer only if asked ("what happens after").
- **What ships instead:** keep the site's current, honest **"no price until the scoped call"** behavior. If Caleb wants *any* number visible, the only honest anchor is his real, established rate stated plainly — **"I work at $150/hr; most first projects are a fixed scope and price we set on the call, so you're never on an open meter"** — with **no "was/now," no "typical," no invented ranges.** Recommendation: keep pricing off the homepage; put the plain-language "fixed scope, fixed price, set before any build, at $150/hr" explanation in the FAQ. **This is a pricing sign-off item for Caleb (§7).**

### Effort estimates on the service cards — honesty caveat
Show the three named offers (below), but **frame any time estimate as a personal guess, not an inferred track record** — the church build's actual hours were never logged, so "typical build: 3–5 days" overstates certainty. Use hedged language: *"Rough first guess: about a week — the call is where we get specific."* Or drop the estimate and let the call set it.

### Services rewritten (named patterns, not generic buckets)
- **The Weekly Report Killer** — pulls data from the tools you already use into one clean report, on schedule.
- **The Follow-Up Autopilot** — a new lead or client action triggers the right message automatically.
- **The Document Pipeline** — raw input (recording, form, spreadsheet) becomes a finished, formatted output with zero manual steps. *(Link this one to the case study — the one pattern with real proof.)*
- Honesty line under the header: *"These are the three patterns I see most — if what's eating your week doesn't fit neatly into one, that's fine. That's what the call is for."*

---

## 4. Interactive Lead Hook — "The Cost of the Manual Way" calculator

**Chosen over a quiz** (unanimous): a calculator does arithmetic on the *visitor's own* inputs, so zero claims about Caleb's expertise or benchmarks are embedded — the safest possible interactive asset for a zero-track-record consultant.

**File:** `src/components/CostCalculator.astro`, inserted between `<Problem />` and `<CaseStudyPreview />`. Self-contained inline `<script>` — no hydration framework, ships as-is in static output.

**Section framing:**
- Eyebrow: `WHAT IT'S ACTUALLY COSTING YOU`
- Headline: `See the price tag on "we've always done it this way."`
- Sub: `Rough math, not a quote — but it's usually the number that gets ignored until someone writes it down. Plug in one task your team repeats by hand.`

**Inputs (4, client-side, live recompute on `input`):**
1. **Task name** — free text, placeholder `"e.g. copying invoice data into QuickBooks"`. Reflected into output copy. Blank → `"This task"`.
2. **Hours/week per person** — number, min 0.5 / max 40 / step 0.5 / default 3.
3. **Number of people** — number, min 1 / max 50 / step 1 / default 1.
4. **Fully-loaded hourly cost** — number, min 10 / max 500 / step 5 / default 35. Caption/tooltip: *"Salary ÷ 2,000, plus ~25–30% for benefits/overhead is a common rule of thumb — or just estimate."*

**Formula (disclosed, no magic):**
```
weekly_hours = hours_per_week * num_people
annual_hours = weekly_hours * 48          // 48 not 52 — subtracts ~4 weeks PTO/holidays, reads conservative
annual_cost  = annual_hours * hourly_cost
```

**Output card** (reuse `.metric-number` / `--font-display` styling so it visually rhymes with the church stats):
```
[Task name] is costing your team an estimated
    [annual_hours] hours          $[annual_cost]
    per year                       per year
```
Add, only when `annual_hours >= 40`: `That's roughly [Math.round(annual_hours/40)] full 40-hour work-weeks on a task a script could run unattended.`

**Pivot line (the ONE place it references Caleb — scoped, singular, hedged; the plural-"clients" slip is corrected):**
> "That's the kind of task that's usually worth automating first — repetitive, rule-based, done by hand mostly because nobody's gotten around to it. I can't promise this exact task is automatable without seeing it, but it's worth 20 minutes to find out for sure."

**Disclaimer under output (non-negotiable):**
> "This is a simple time-cost estimate you're providing — not an audit, and not a guarantee of savings. It's meant to make the cost visible, nothing more."

**CTA + lead capture (zero backend for v1):**
- Primary button → `https://calendar.app.google/NUxmMR4GipiHsD7d9`.
- Secondary **mailto pre-filled with the computed numbers** — this IS the v1 lead-capture (a "not ready to book" visitor still lands in Caleb's inbox):
```js
const subject = `A manual task costing us ~$${annualCost}/yr`;
const body =
  `Hi Caleb — here's what I plugged into the calculator on your site:\n\n` +
  `Task: ${taskName}\nHours/week per person: ${hoursPerWeek}\n` +
  `People doing it: ${numPeople}\nEstimated hourly cost: $${hourlyCost}\n\n` +
  `Estimated annual cost: ~$${annualCost} (${annualHours} hours)\n\n` +
  `Want to talk about whether this is automatable?`;
const mailto = `mailto:caleb@calebautomates.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
```
Link text: `"or email me these numbers →"` (matches the existing `CTA.astro` mailto pattern).

**Styling:** reuse `.service-card` container tokens (`--color-surface`, `--color-border`, `--radius-xl`), number inputs on `--color-border`/`--radius-md`, single-column stack under 680px (existing breakpoint). ~180–220 lines, no new deps, no `astro.config` change.

**Web3Forms upgrade (documented, NOT built for v1):** free tier, email for an access key, hidden `access_key` input, client-side `fetch()` POST to `https://api.web3forms.com/submit`, show a client-side "thanks, I'll follow up" state. Add a 5th optional email field to build a real list. Ship only once traffic justifies the moving part. **The access key is a Caleb item (§7).**

---

## 5. Inbound Content + SEO

### Site-level SEO fixes (do now — cheap, zero copy risk)
Add to `Base.astro` / `public/` / `astro.config.mjs`:
1. `public/robots.txt` — allow all, point to sitemap.
2. `@astrojs/sitemap` integration (one config line).
3. `<link rel="canonical" href={Astro.url.href} />`.
4. **`og:image`** (real 1200×630 static card — matters *immediately* for shared links), `og:url`, `twitter:card=summary_large_image`, `twitter:title/description/image`.
5. One `Person` / `ProfessionalService` JSON-LD (name, credential, `areaServed`: Kansas City / remote, `sameAs`: LinkedIn/GitHub). **No `AggregateRating`/`Review` schema** — there are no testimonials.
6. Per-page unique `title`/`description`; pattern `{Post Title} | Caleb Automates`.
7. Every post links to the church case study, the relevant Services anchor, and the CTA.
8. `/blog/[slug]` URLs (no dates — evergreen). One `<h1>`, `<h2>` per section for snippet eligibility.
9. `astro:assets` `<Image>` for post images; confirm `font-display: swap` (already set).

### The 3 to write first
**1. "The Software Silo Tax: What Manually Moving Data Between Apps Actually Costs a Small Business"**
- Target query: "stop manually copying data between apps," "manual data entry between systems."
- Outline: the symptom (your team is the integration layer) → where it shows up → the quick-math formula (worked example with clearly-labeled *hypothetical* numbers, explicitly not client data) → why "just hire someone" doesn't scale → sometimes it's Zapier, sometimes custom → link to the church post.
- CTA: "Curious what your number is? Book a free 20-minute call — I'll help you find it, no pitch." *(Also the natural home for the calculator.)*

**2. "How I Automated a Church's Entire Content Pipeline — A Real, Warts-and-All Case Study"** *(the pillar; publish first — it's a rewrite of existing material and the internal-link hub)*
- Target query: "automation case study small business," people vetting Caleb.
- Outline: starting problem → what "automated" means here (stages, ~1hr/month) → design decisions and what almost went wrong → technical shape (honest, not a brag sheet) → explicit "this was volunteer, not a paid client, but the capture→transform→distribute pattern is what I build for businesses" → what it proves and doesn't (the zero-clients paragraph, turned into a strength).
- CTA: the guarantee.

**3. "Is Your Business Ready for Automation? A 10-Minute Self-Audit"**
- Target query: "is my business ready for automation," "business process automation checklist."
- Client-side checklist (8–12 items across document handling / client comms / reporting / scheduling); output = "3 signals found" + plain-language fix patterns (general only, no invented case studies). **Not a fake score-out-of-100.**
- CTA: "Want a second pair of eyes? Free 20-minute call."

### Backlog (drip 1 per 1–2 weeks)
4. Zapier vs. Make vs. Custom Code (vendor-neutral decision framework) · 5. Simple AP automation without enterprise software · 6. Client-communication automations (follow-ups/reminders/status) · 7. Automated Friday-afternoon reporting · 8. Hire an ops person vs. automate the role · 9. What "AI automation" actually means for an SMB · 10. A founder's guide to auditing your own busywork.

---

## 6. Trust / Credibility

**The exact elements (all traceable to reality):**
- **Employment credibility:** Cerner FHIR at ~1M req/day, GDPR lead, PCI-compliant payments — framed as *employment* (W-2, team-based), never as client work.
- **The one real proof:** church pipeline, in production since early 2026, ~1hr/month upkeep — **labeled a volunteer project within one sentence of the headline, everywhere it appears.**
- **The guarantee block** (§2) as a distinct card near the CTA.
- **The FAQ "why should I be your first" answer** (§2) — the single best trust move: name the gap yourself before a skeptic finds it, and reframe it as leverage (full attention, direct access, personally on the hook).

**Honest framing of "no clients yet":**
- State it plainly, once, in the FAQ and one calm About line. **Do not** give it a dedicated top-of-funnel "confession" section (reads nervous).
- **Never** use plural "clients" for consulting work until there are ≥2. Until then: singular/hypothetical ("when I take on a project," "for your business") or "the church system (a volunteer project)."
- **Source-tag every number:** "(at Cerner)" / "(the church system, unpaid)." A visitor should never have to guess whether a figure came from employment, volunteer work, or a paying client.
- **No testimonial blockquotes, no logos, no ratings** — a fake-looking empty testimonial region is worse than none.

---

## 7. Requires Caleb (flagged, blocking where noted)

| Item | Why it needs Caleb | Blocking? |
|---|---|---|
| **Pricing sign-off** | The blueprint keeps pricing OFF the homepage and, if any number appears, uses only his real $150/hr with no invented ranges/discounts. Confirm: homepage stays price-free, and the FAQ may state "$150/hr, fixed scope set on the call." | Blocks the Services/FAQ copy — but a safe default (no number) ships without him. |
| **Vercel preset "Other" → "Astro"** | Flip before merging `conversion-inbound-overhaul` to `main` or the live site breaks. Known deploy blocker. | **Yes — blocks go-live.** |
| **Web3Forms access key** | Only if upgrading the calculator past mailto-only. v1 (mailto) needs nothing. | No — deferred by design. |
| **OG image asset** | A 1200×630 branded card. Can be plain (no fabrication). Claude can generate a placeholder; Caleb approves/replaces. | No — placeholder unblocks. |
| **Confirm the `caleb@calebautomates.com` inbox** is monitored | The calculator mailto and CTA fallback route there. | No, but leads silently drop if unmonitored. |
| **Publishing the church deep-dive** | Confirm nothing in the expanded case study exposes anything the church would object to; it stays labeled volunteer. No *other* client/confidential work gets published (there is none). | Blocks pillar-post publish only. |
| **LinkedIn/GitHub URLs** | For the `sameAs` JSON-LD and footer. | No — schema ships without them, added later. |

---

**Relevant files:**
- Edit: `C:\Users\Caleb\Workspace\calebautomates\src\components\{Experience,About,Hero,Services,Problem,CTA}.astro`, `src\pages\index.astro`, `src\layouts\Base.astro`
- Create: `src\components\{CostCalculator,FAQ,Guarantee}.astro`, `src\pages\blog\index.astro`, `src\pages\blog\[...slug].astro`, `public\robots.txt`, `public\og-image.png`
- Update: `src\content\config.ts` (add `blog` collection), `astro.config.mjs` (add `@astrojs/sitemap`)
- Pattern to mirror for blog routes: `src\pages\portfolio\[...slug].astro`

**One-line sequence:** fabrication fix (now) → reorder + calculator + offer rename + trust/FAQ + SEO meta (this week) → blog infra + church pillar post (background) → drip the rest.