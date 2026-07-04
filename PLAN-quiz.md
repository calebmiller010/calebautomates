<!-- Quiz design (2026-07-03): 4-angle research + synthesis. 3 route concepts; recommendation = Concept A now, grows into B. Honest estimate model (math on visitor inputs, ranges, no fabricated benchmark). -->

# Automation-Value Quiz: Route Options for calebautomates.com

## 1. The core decision — 3 real forks

Everything else is detail. Pick a point on each of these three axes and the concept is basically determined.

**Fork A — Linear vs. Branching.**
Linear = same questions, same order, every time (fast, predictable, trivial to QA, ~90-second finish). Branching = the questions or follow-ups change based on answers (feels more like a real diagnosis, but multiplies build + QA surface and creates more places a canned "read" can misfire). The research is clear that a *true* branch tree is over-engineering for a first ship; the sweet spot is **"shallow branching"** — a linear flow where one answer swaps the *result copy* (an archetype), or spawns *one* tailored follow-up. That gets ~90% of the "feels smart" payoff at a fraction of the cost.

**Fork B — Show-free vs. Email-gated result.**
The generic quiz-funnel playbook gates the result behind email (drives the cited 30-40% opt-in rates). But that playbook assumes an established brand. Caleb has **zero clients and is in a trust-building phase** — an email wall on a tool whose entire job is *to demonstrate value and honesty* is a trust cost he can't yet afford, and it kills shareability (nobody shares a result they had to pay an email for). The honest resolution used across the research: **two-stage reveal** — show a useful result *free and immediately*, then offer email only as an *optional* "send me the full write-up." The email is the net for not-ready visitors, never the toll booth.

**Fork C — Simple estimate vs. richer diagnostic.**
This is the axis that separates the quiz from the existing calculator. Simple = one dollar/hours number (which the calculator already does). Richer = decompose the *whole back office* into named categories, show where time actually goes, and roll up a *portfolio* estimate across them. The richer read is the whole reason to build a second tool — but "richer" must NOT mean a 0-100 pseudo-score with hidden weights (that reads as a fabricated benchmark and, per the plan doc, "grades the business," which is presumptuous for a no-track-record consultant). Richer done honestly = more inputs, transparent math, a plain-language band, a range not a false-precise point.

---

## 2. Three distinct concepts

### Concept A — "The 60-Second Read" (lean linear estimator)

- **Pitch:** A five-tap, one-screen-per-question estimator that turns "we waste a lot of time" into a rough hours-back and dollar range across your whole team — the fast cousin of the cost calculator.
- **Questions (5, all linear):**
  1. Team size touching repetitive admin (radio bands: solo/1-4, 5-15, 16-50, 50+) — *multiplier*
  2. Where most manual work happens (radio: data entry / follow-ups / reports / scheduling / other) — *picks result archetype copy*
  3. How many tools that work touches (radio: one / 2-3 disconnected / 4+ mess) — *range-width nudge, personalization*
  4. Combined hours/week on it (number input, mirrors calculator) — *load-bearing core input*
  5. What the time back would buy (radio: clients/sales / fewer errors / less stress / grow without hiring) — *mirrored back in CTA, no math role*
- **Result:** A named pattern ("The Disconnected Toolbox") + hours/year and a rough $/year range + 2-3 sentences of pattern-language read tied to their own answers.
- **Estimate model:** `hours/week × team-size-midpoint × 48 weeks`, dollars via a disclosed editable default rate ($35). Same arithmetic-on-their-inputs model as the calculator, just team-wide.
- **Lead capture:** Result free; "Email me this result" via **mailto pre-fill** (same idiom as the calculator, zero new infra). No key needed.
- **Effort:** **S.** Basically the calculator + 4 radio screens + an archetype copy table.
- **Great for:** Shipping this week; the lowest-risk way to get a shareable, mobile-first diagnostic live without a Web3Forms dependency.

### Concept B — "The Back-Office Diagnostic" (branching department-by-department scorecard)

- **Pitch:** A short adaptive diagnostic that maps time across the three parts of your back office and shows you which one is the highest-leverage place to start.
- **Questions (7-9, shallow branching):** Multi-select the areas that hurt (data movement / reconciliation & follow-ups / reporting), capped at 3 → for each selected area, one tailored follow-up block (rough hours, headcount, "how bad when it breaks"). Then two shared baseline screens (hourly rate w/ role-band fallback; operating weeks).
- **Result:** A category-by-category breakdown ("Data Movement: high · Follow-ups: medium · Reporting: low") + a per-area and total hours/$ range + which of Caleb's named service patterns fits + a "show the math" expander.
- **Estimate model:** Per-area `hours × people × weeks × recoverable-fraction` (a *disclosed, labeled* editorial assumption table, e.g. data entry ~70%, reporting ~55%), summed; presented as a range by flexing the fraction ±15pp. Optional user-supplied error-cost adder (never auto-filled).
- **Lead capture:** Headline range free; full category breakdown / "show the math" or emailed write-up gated behind **Web3Forms** (email only). **Needs Caleb's key.**
- **Effort:** **L.** Conditional follow-up rendering, per-area rollup, the recoverable-fraction model, the gate, and the QA of "what if they change a selection after answering a branch."
- **Great for:** The visitor who knows they're drowning but not *where*; produces the most sales-actionable, pre-qualified lead and the best demonstration of how Caleb thinks.

### Concept C — "Automation Opportunity Score" (shareable benchmark-style result)

- **Pitch:** Answer 9 quick questions, get your Automation Opportunity Score and a shareable result card.
- **Questions (9, linear):** 3 categories × 3 questions, each answer worth 0-3 points; plus a couple of numeric sliders (hours, team, rate) so the estimate can still do honest math.
- **Result:** A 0-100 score + tier label ("Real opportunity here") + top category named + share button.
- **Estimate model:** Point-sum → percentage → tier (the ScoreApp mechanic), with the $/hours computed from the sliders.
- **Lead capture:** Free teaser score (screenshot-shareable), full breakdown gated behind email (Web3Forms). **Needs key.**
- **Effort:** **M.**
- **Great for:** Maximizing raw shareability/virality *if* Caleb had social proof to back a "score."
- ⚠️ **Honesty caveat:** A 0-100 "score" with weighted points is exactly what the plan doc rejected — it reads as a validated benchmark model that doesn't exist, and it "grades the business." **Recommend against C as-is.** Its one genuinely good idea — the screenshot-shareable teaser card — should be lifted into whichever route wins, expressed as the visitor's *own hours number* ("~140 hrs/yr") rather than a manufactured score.

---

## 3. Recommendation

**Build Concept A ("The 60-Second Read") now, architected so it grows into Concept B later.**

For a seller-averse solo who wants buyer-quality leads + shareability + not a huge build, A wins on every constraint that actually binds:

- **Not a huge build (S):** It's the calculator you already shipped plus four radio screens and a copy table. Same file pattern, same tokens, same voice, no backend — it can go live without waiting on a Web3Forms key.
- **Shareability:** A one-screen-per-question mobile quiz with a named-pattern result and an "I'd get back ~X hrs/yr" share line is far more shareable than a 4-field calculator — and the number shared is always the visitor's *own* honest figure, so it stays truthful.
- **Buyer-quality leads:** The mailto capture lands every not-ready visitor in Caleb's inbox *with all five answers and the computed estimate already written out* — better-qualified than a bare form submission, and it demonstrates his thinking (the actual product) before any call.
- **Seller-averse fit:** Result-free-first, plain non-alarmist labels, and the same "rough estimate, not a guarantee" disclaimer mean the tool sells by being useful, not by extracting an email or hyping a score.
- **Honesty held:** Pure arithmetic on the visitor's own inputs + one disclosed default rate. No score, no benchmark, no invented stat — nothing the plan doc ruled out.

B is the better *diagnostic*, but its L effort, its recoverable-fraction assumption table (more honesty surface to defend), and its Web3Forms dependency make it the wrong *first* ship. Build A, watch which archetype answers actually show up in real traffic, and graduate to B's branching + category rollup as a v2 once it's earned. Reject C's score framing outright; keep only its shareable teaser card, which A already delivers honestly.

---

## 4. Build spec — Concept A, "The 60-Second Read"

**File:** new `src/components/AutomationQuiz.astro`, self-contained with an `<script is:inline>` (no hydration framework), scoped `<style>` reusing `--color-primary`, `--font-display`, `--space-*`, `--radius-*`, and the `.calc-metric*` treatment. New page `src/pages/quiz.astro` renders it (heavier than an inline section). Reuse `BOOKING_URL = 'https://calendar.app.google/NUxmMR4GipiHsD7d9'` verbatim.

### Questions (one per screen, mobile-first, radio auto-advances; Q4 has an explicit "See my result" button)

1. **"Roughly how big is your team?"** → `solo` (midpoint 1), `1–4` (2.5), `5–15` (10), `16–50` (33), `50+` (60). *Multiplier.*
2. **"Where does most of the manual, repetitive work happen?"** → `data-entry` / `follow-ups` / `reports` / `scheduling` / `other`. *Selects archetype + which service pattern the read names.* **This is the only branch — copy only, not question flow.**
3. **"How many tools/systems does that work touch?"** → `one` (±10%) / `disconnected` (2-3, ±20%) / `mess` (4+, ±30%). *Sets range width only — never the point estimate.*
4. **"About how many hours a week does your team spend on it, combined?"** → number input (min 0.5, max 200, default 5), same `.calc-field` style. *Core load-bearing input. Ask TOTAL combined hours, not per-person — do NOT also multiply by Q1 team size, or you double-count. Q1 is used only to pick sensible copy and to sanity-cap the hours (e.g. warn if combined hours exceed team-size × 40).*
5. **"If this got fixed, what would that time actually buy you?"** → `clients` / `errors` / `stress` / `grow`. *Mirrored back in CTA line; zero math role.*

> Note on the double-count trap: because Q4 already asks *combined* team hours, the formula does **not** multiply by team size. Team size (Q1) drives copy and the plausibility cap only. This keeps the math transparent and honest when shown.

### Branch logic

Only Q2 branches, and only the *words*: a static `ARCHETYPES` object maps each Q2 value → `{ name, read }`. Q3 and Q5 values interpolate into the read string. No question is skipped or added. Trivial to QA (five copy variants, written and reviewed once).

### Exact estimate formula + disclaimer

```js
// Load-bearing inputs: hoursPerWeek (Q4), hourlyRate (disclosed default, editable on result screen)
const WEEKS = 48;                 // same conservative PTO-subtracting constant as the calculator
const DEFAULT_RATE = 35;          // same disclosed default as the calculator
const annualHours = Math.round(hoursPerWeek * WEEKS);
const annualCost  = Math.round(annualHours * rate);

// Range width comes ONLY from Q3 tool-count (a proxy signal → lives in the range, not the point)
const band = { one: 0.10, disconnected: 0.20, mess: 0.30 }[toolsAnswer];
const lowCost  = Math.round(annualCost * (1 - band) / 500) * 500;   // round to $500
const highCost = Math.round(annualCost * (1 + band) / 500) * 500;
const lowHrs   = Math.round(annualHours * (1 - band) / 5) * 5;
const highHrs  = Math.round(annualHours * (1 + band) / 5) * 5;
```

Headline: **"Roughly {lowHrs}–{highHrs} hours a year — about ${lowCost}–${highCost} in staff time — based on what you told me."**

**Disclaimer (verbatim, directly under the numbers, matching calculator placement/voice):**
> *This is a rough estimate built from the numbers you just entered — not an audit, and not a guarantee of savings. It's meant to make the size of the problem visible, nothing more. Whether these specific tasks are automatable is exactly what the free 20-minute call is for.*

Editable rate field on the result screen (default $35) with the calculator's exact hint: *"Salary ÷ 2,000, plus ~25–30% for benefits/overhead is a common rule of thumb — or just estimate."*

### Result copy (example: Q2 = data-entry, Q3 = mess, Q5 = grow)

Headline archetype: **"You're running The Disconnected Toolbox."**
Read: *"With that work spread across 4+ tools that don't talk to each other, the usual fix isn't one big new system — it's a handful of small connections that stop the re-keying. That's typically the kind of thing worth automating first: repetitive, rule-based, and done by hand mostly because nobody's gotten around to it. You said the time back would go toward growing without hiring — that's usually where this shows up first."*
(All hedged pattern-language — "usually," "the usual fix" — never a diagnosis of their specific stack.)

### UX

- One question per screen; thin progress bar reading "Question 2 of 5" (not a percentage, no timer), **pre-filled to ~15%** on Q1 (endowed-progress effect). Small back button, top-left.
- Radio options as full-width tap targets (min 44px), auto-advance on select; Q4 keeps a "See my result →" button.
- Result: archetype headline → estimate block (reuse `.calc-metrics` big `--font-display` numbers, now showing ranges) → disclaimer → tailored read → **primary CTA "Book a free 20-minute call"** (reuse `.calc-book-btn` styling + `BOOKING_URL`) → **secondary "Email me this result"** → de-emphasized share line below.
- **Share:** `navigator.share()` (mobile) with `navigator.clipboard.writeText()` fallback (desktop). Text: *"I just found my team could get back about ~{annualHours} hours a year on manual work — what's yours? {quizURL}"*. Deep-links to quiz **start** (no answers in the URL → no PII, receiver takes it fresh). Small, optional, below the CTA — upside, not the point.

### Lead capture

- **v1 (ship now, no key):** "Email me this result" = **mailto pre-fill** to `caleb@calebautomates.com`, subject naming the archetype, body containing all 5 answers + the computed range. Identical idiom to the calculator's `calc-mailto`. **No Web3Forms key required.**
- **v2 (documented, deferred):** optional Web3Forms email field on the result screen (hidden `access_key`, client `fetch()` POST, success line replaces the field). **Flag: this is the one piece that needs Caleb's Web3Forms access key** — the same open item already noted for the calculator in `PLAN-first-client.md §7`. Do not build until traffic justifies it.

---

## 5. How it complements (not duplicates) the ROI calculator

`CostCalculator.astro` owns the **single-task, high-intent, bottom-of-funnel** lane: a visitor who *already knows the one task that hurts*, wants the number now, no steps, no email. It multiplies one task's hours × people × rate.

The quiz owns the **whole-back-office, earlier-funnel, diagnostic** lane: a visitor who feels the pain but isn't sure *where the time goes*. It walks them across the whole operation, names a pattern, and produces a *team-wide* range — the input surface the calculator structurally can't cover (it only ever asks about one task).

They share the same honesty model (arithmetic on the visitor's own inputs, same 48-week constant, same disclosed default rate, same disclaimer voice), the same booking CTA, and the same mailto capture idiom — so they read as **siblings, not competitors**. Cross-link both ways:
- Quiz result footer → *"Want to sanity-check one specific task's number? Try the quick cost calculator →"*
- Calculator pivot line → *"Not sure which task to start with? Take the 2-minute automation quiz →"*

Different entry points into the same call, matched to how much the visitor already knows about their own problem — one funnel, two doors.

**Files:** new `src/components/AutomationQuiz.astro` + `src/pages/quiz.astro`; reuses tokens/`BOOKING_URL`/mailto idiom from `src/components/CostCalculator.astro` and `src/components/CTA.astro`. Only open dependency for the deferred v2 gate: Caleb's Web3Forms access key.