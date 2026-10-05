# Fermor (fermor.in) — Personal Finance Homepage

A worked-arithmetic homepage for **Fermor** ([fermor.in](https://fermor.in)), built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, Drizzle ORM, Zod, and Vitest.

## Core Concept: "Show Your Working"

Fermor's core differentiator is showing the worked arithmetic behind every money decision (SIP, EMI, take-home salary) with zero forced login and 100% open formulas. The interface feels like a well-kept worked answer: calculator-tape receipts, ledger rules, and tabular numbers.

---

## Tech Stack

- **Framework:** Next.js 14.2+ (App Router, Server Components & Route Handlers)
- **Language:** TypeScript (Strict mode)
- **Styling:** Tailwind CSS (Custom paper `#F3F4F0`, ink `#0B0D0C`, and verified Fermor green `#75FB90` tokens)
- **Typography:** Bricolage Grotesque (Display), Inter (Sans), JetBrains Mono (Mono / Tabular numbers)
- **Animations:** Framer Motion (subtle sequence reveals & tab transitions)
- **Database & ORM:** Drizzle ORM with Postgres (Neon / Supabase) + Graceful In-Memory Fallback
- **Validation:** Zod schemas for all API payloads and calculator inputs
- **Form Handling:** React Hook Form
- **Unit Testing:** Vitest (Pure mathematical calculator functions)

---

## Project Structure

```
a:/fermor/
├── app/
│   ├── api/
│   │   ├── feedback/route.ts     # User tape clarity feedback
│   │   ├── scenarios/route.ts    # Server-side validation & permalink creation
│   │   └── subscribe/route.ts    # Email subscription with rate limit & honeypot
│   ├── s/[slug]/page.tsx         # Read-only worked tape permalinks
│   ├── globals.css               # Graph paper, receipt edges, double rules
│   ├── layout.tsx                # Font loaders, metadata, landmark skip links
│   └── page.tsx                  # 11-section homepage assembly
├── components/
│   ├── Nav.tsx                   # Accessible navbar with mobile drawer
│   ├── Hero.tsx                  # Asymmetric split & live Working Tape tool
│   ├── PrinciplesStrip.tsx       # "No login. No black boxes. Free." rules
│   ├── UnderstandActGrow.tsx     # Horizontal desktop sticky progress / mobile stack
│   ├── CalculatorIndex.tsx       # Filterable table-style calculator directory
│   ├── HowWeCalculate.tsx        # Open methodology with expandable worked example
│   ├── CompareLearn.tsx          # Real Fermor blog analysis cards
│   ├── WhoItsFor.tsx             # 4 persona ledger tabs
│   ├── Faq.tsx                   # 6 accessible accordion questions
│   ├── FinalBand.tsx             # Full-width Fermor green CTA & newsletter form
│   └── Footer.tsx                # Verified disclaimers & footer links
├── lib/
│   ├── calc/
│   │   ├── sip.ts                # Pure SIP compounding math & tape generator
│   │   ├── emi.ts                # Pure loan EMI reducing balance math & tape
│   │   ├── salary.ts             # Pure Indian in-hand salary math (FY 25-26)
│   │   ├── calc.test.ts          # Vitest unit tests
│   │   └── index.ts              # Pure function exports
│   └── db/
│       ├── schema.ts             # Drizzle tables (scenarios, subscribers, feedback)
│       └── index.ts              # DB client + graceful offline memory store
├── design-tokens.ts              # Verified brand tokens & typography specs
├── product-understanding.md      # Product summary & audit findings
├── drizzle.config.ts             # Drizzle Kit configuration
└── DEPLOY.md                     # Vercel deployment checklist
```

---

## Getting Started

### 1. Installation

```bash
cd fermor
npm install
```

### 2. Environment Setup

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Set your Neon Postgres connection string in `.env.local`:

```env
DATABASE_URL="postgres://user:password@ep-sample-123456.us-east-2.aws.neon.tech/neondb?sslmode=require"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

*Note: If `DATABASE_URL` is omitted or database is unreachable, scenario saving and subscriptions gracefully fallback to in-memory mode without throwing errors.*

### 3. Database Migration

Push schema definitions to your Postgres database:

```bash
npm run db:push
```

### 4. Run Unit Tests

Execute pure mathematical tests for SIP, EMI, and Salary logic:

```bash
npm run test
```

### 5. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the homepage.

---

## Decisions I Made (TODO Prompts for User)

> **Instructions:** The prompts below are provided as TODO templates for you to write in your own words before submitting.

- **TODO: Visual Tone & Aesthetics** — *Explain why you chose Bricolage Grotesque, paper (#F3F4F0), and crisp accounting rules over traditional dark fintech gradients.*
- **TODO: Working Tape Experience** — *Describe the user experience of sliding parameters and watching live calculation receipts print in sequence.*
- **TODO: Database Fallback Strategy** — *Explain your architectural choice of combining Drizzle ORM with an in-memory cache fallback for resilient client operation.*
- **TODO: Content Accuracy** — *Detail how you ensured all URL slugs, blog titles, and tax rules strictly reference verified fermor.in pages.*
