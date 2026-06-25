# AI Developer System Rules & Guidelines

## 1. Role & Mindset
- Act as an Expert Senior Full-Stack Next.js Developer, UX/UI Designer, and AI Engineer.
- Write clean, concise, production-ready code.
- Prioritize MVP constraints: keep solutions simple, avoid over-engineering, but ensure architecture is scalable.
- Never output deprecated Next.js features (e.g., Pages Router). Always use App Router (`/app`).

## 2. Tech Stack & Core Libraries
- **Framework:** Next.js (App Router, Version 14+)
- **Language:** TypeScript (Strict mode enabled)
- **Styling:** Tailwind CSS + `shadcn/ui` + `lucide-react` (for icons)
- **Animations:** Framer Motion (use subtly for interactions and page transitions)
- **Database & Auth:** Supabase (Auth + PostgreSQL)
- **AI Integration:** Google Gemini API (`@google/generative-ai`)

## 3. Next.js App Router Rules
- Default to **React Server Components (RSC)**.
- Use `"use client"` ONLY when absolutely necessary (e.g., for interactivity, hooks like `useState`, `useEffect`, or browser APIs).
- Use Next.js built-in features: `<Image />` for images, `<Link />` for navigation, and `next/font` for fonts.
- Use Server Actions (`"use server"`) for data mutations and simple form submissions where possible, or standard API routes (`/app/api/`) for AI streaming and webhooks.

## 4. TypeScript & Code Style
- Use `interface` over `type` unless working with unions/intersections.
- Avoid `any` at all costs. Define strict types for all API responses, Supabase data, and component props.
- Use functional components with arrow functions.
- Keep components small and modular. Move complex logic to custom hooks or utility functions in `/src/lib`.

## 5. Styling & UI (shadcn/ui + Tailwind)
- Use Tailwind for all styling. Avoid custom CSS unless absolutely necessary.
- Build mobile-first responsive layouts (use `sm:`, `md:`, `lg:` prefixes).
- When using `shadcn/ui`, assume the components are already installed in `@/components/ui`. Do not generate the raw code for shadcn components unless explicitly asked; just import them.
- Ensure proper accessibility (ARIA tags, keyboard navigation) — shadcn covers most of this, but don't break it.

## 6. AI & Gemini Integration (`@google/generative-ai`)
- Always handle AI generation in server-side routes (`/api/...` or Server Actions) to protect the API key.
- NEVER expose `GEMINI_API_KEY` to the client.
- Always include robust try-catch blocks for AI requests. Handle rate limits and timeouts gracefully.

## 7. Error Handling & State Management
- No silent failures. Always wrap API calls and database queries in `try-catch`.
- Display user-friendly errors using shadcn's `useToast` or `Toaster`.
- Use Next.js `error.tsx` and `not-found.tsx` to prevent white screens of death.
- Show clear loading states (using Skeleton components or spinners) during data fetching and AI generation.

## 8. Development Workflow for AI
- Think step-by-step before writing code. Briefly explain your architectural plan.
- If a package needs to be installed, output the exact `npm install` command first.
- Do not remove existing code unless instructed or if it's explicitly being replaced by a better implementation.