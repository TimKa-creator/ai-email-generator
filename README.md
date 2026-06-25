# AI EmailGen

Write better emails 10x faster. A full‑stack SaaS that turns a short prompt into a polished,
ready‑to‑send email using Google Gemini — with authentication, per‑user word quotas, and a
multilingual interface.

> **Live demo:** _add your deployment URL here_

## ✨ Features

- **AI email generation** — pick a tone (10 options) and an approximate word count, and Gemini
  writes the email. A **Custom** length is available; emails over 200 words are gated behind Pro.
- **Editable drafts** — refine the generated text in place before copying it.
- **Authentication** — email/password sign‑up and login via Supabase Auth, with protected routes.
- **Usage quotas** — per‑user monthly word limits tracked in Supabase (Free: 2,000 words/month).
- **Internationalization** — UI in English, Ukrainian, Russian and German; emails are generated in
  the selected language.
- **Polished UI** — responsive, mobile‑first design with shadcn/ui, Tailwind CSS and Framer Motion.

## 🧰 Tech Stack

| Area        | Technology                                            |
| ----------- | ----------------------------------------------------- |
| Framework   | [Next.js 16](https://nextjs.org) (App Router)         |
| Language    | TypeScript (strict)                                   |
| Styling     | Tailwind CSS v4 · [shadcn/ui](https://ui.shadcn.com) · lucide-react |
| Animation   | Framer Motion                                         |
| Auth & DB   | [Supabase](https://supabase.com) (Auth + PostgreSQL)  |
| AI          | [Google Gemini](https://ai.google.dev) (`@google/generative-ai`) |
| Deployment  | Vercel                                                |

## 🚀 Getting Started

### 1. Clone & install

```bash
git clone https://github.com/TimKa-creator/ai-email-generator.git
cd ai-email-generator
npm install
```

### 2. Configure environment variables

Copy the example file and fill in your own keys:

```bash
cp .env.local.example .env.local
```

| Variable                         | Where to find it                                       |
| -------------------------------- | ------------------------------------------------------ |
| `NEXT_PUBLIC_SUPABASE_URL`       | Supabase → Project Settings → API                      |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`  | Supabase → Project Settings → API (anon public)        |
| `SUPABASE_SERVICE_ROLE_KEY`      | Supabase → Project Settings → API (**service_role**, secret) |
| `GEMINI_API_KEY`                 | https://aistudio.google.com/apikey                     |

> `SUPABASE_SERVICE_ROLE_KEY` is a **server‑only secret** — never expose it to the client and never
> commit it.

### 3. Set up the database

Run [`supabase/schema.sql`](supabase/schema.sql) in the Supabase SQL Editor to create the `usage`
table (tracks per‑user word usage with row‑level security).

### 4. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 📁 Project Structure

```
src/
├── app/                     # App Router pages & API routes
│   ├── api/generate/        # POST route — Gemini generation + quota enforcement (server)
│   ├── dashboard/           # Protected: the email generator
│   ├── login, signup/       # Supabase auth pages
│   ├── pricing, profile/    # Pricing tiers · account + usage
│   ├── page.tsx             # Landing page
│   └── layout.tsx           # Root layout (Header / Footer / i18n / Toaster)
├── components/
│   ├── ui/                  # shadcn/ui primitives (button, card, input, select…)
│   ├── layout/              # Header, Footer, AuthButtons, LanguageSwitcher
│   ├── dashboard/           # EmailForm (the generator form)
│   └── pricing/             # UpgradeButton
├── hooks/                   # useAuthGuard, useSession
├── i18n/                    # LanguageProvider, locales, translation dictionaries
└── lib/                     # supabase (client), supabase-admin (server), quota, utils
supabase/
└── schema.sql               # Database schema (usage table + RLS)
```

**Where things live:**

- **API routes** → [`src/app/api/`](src/app/api) (e.g. `api/generate/route.ts`)
- **UI components** → [`src/components/`](src/components) (`ui/` primitives, feature folders alongside)
- **Server-only logic** (service-role key, AI calls) stays in API routes and `src/lib/supabase-admin.ts`.

## 🔐 Security notes

- The Gemini API key and Supabase service‑role key are used **only** server‑side (API routes) and are
  never shipped to the browser.
- `.env.local` is git‑ignored; only `.env.local.example` (placeholders) is committed.

## 📦 Deployment

Deploy to [Vercel](https://vercel.com/new): import the GitHub repo and add the four environment
variables above in **Project Settings → Environment Variables**. Missing variables cause a 500 in
production.

---

Built with Next.js, Supabase and Google Gemini.
