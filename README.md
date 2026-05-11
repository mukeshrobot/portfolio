# Portfolio — Mukesh Arya

Professional developer portfolio built with Next.js 14 (App Router), Tailwind CSS, and Framer Motion.

## Stack

- **Next.js 14** (App Router, RSC)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** — section reveals
- **Lucide** — icons

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Structure

```
app/                  # routes (App Router)
  page.tsx            # home (hero + about + projects + skills + contact)
  projects/           # /projects + /projects/[slug]
  blog/               # /blog + /blog/[slug]
components/           # UI building blocks
lib/                  # data: projects, blog posts, site config
```

## Customize

- `lib/site.ts` — name, role, links, email
- `lib/projects.ts` — featured projects + case study content
- `lib/blog.ts` — blog posts

## Deploy

```bash
npm run build
```

Recommended: Vercel. Push to GitHub, import on Vercel, ship.
