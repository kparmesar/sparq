# SPARQ

**Severn Paediatric Audit, Research & Quality Improvement Network**

A website for paediatric trainees in the Severn (South West) region with academic interests in research, quality improvement, and audit. Serves as the single hub for the network — consolidating events, project databases, showcase of academic output, and blog.

**Live:** [sparq.org.uk](https://sparq.org.uk)

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router, React 19, Server Components) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + CSS custom properties |
| Animations | Framer Motion |
| Database | Neon (Serverless PostgreSQL) |
| ORM | Drizzle ORM |
| Auth | JWT sessions via `jose` (cookie-based admin auth) |
| Hosting | Vercel |
| Font | Inter (via `next/font/google`) |

## Architecture

```
src/
├── app/                      # Next.js App Router
│   ├── layout.tsx            # Root layout — Navbar + Footer wrapper
│   ├── page.tsx              # Home — Hero, FeatureCards, ActivityFeed, CTA
│   ├── about/                # Static about page
│   ├── blog/                 # Blog listing + [slug] detail pages
│   ├── events/               # Events listing + [slug] detail pages
│   ├── projects/             # Projects listing + [slug] detail pages
│   ├── showcase/             # Showcase gallery
│   ├── contact/              # Contact page
│   └── admin/
│       ├── login/            # Admin login (username/password → JWT)
│       └── (dashboard)/      # Auth-protected admin panel
│           ├── layout.tsx    # Admin nav (separate from public site)
│           ├── page.tsx      # Dashboard with content counts
│           ├── blog/         # CRUD for blog posts
│           ├── events/       # CRUD for events
│           ├── projects/     # CRUD for projects
│           └── showcase/     # CRUD for showcase items
├── components/
│   ├── layout/               # Navbar, Footer
│   ├── home/                 # Hero, StatsBar, FeatureCards, ActivityFeed, CTABanner, ParticleField
│   ├── blog/                 # BlogList
│   ├── events/               # EventList
│   ├── projects/             # ProjectList
│   ├── showcase/             # ShowcaseList, ShowcaseBanner
│   ├── admin/                # BlogPostForm, EventForm, ProjectForm, ShowcaseForm, DeleteButton
│   └── ui/                   # Skeleton
├── lib/
│   ├── constants.ts          # NAV_LINKS, SITE_NAME, STATS
│   ├── utils.ts              # Formatting helpers
│   ├── mock-data.ts          # Dev seed data
│   ├── db/
│   │   ├── index.ts          # Neon + Drizzle client
│   │   ├── schema.ts         # Table definitions (projects, events, showcase, blog_posts)
│   │   └── queries.ts        # Reusable query functions
│   └── admin/
│       ├── auth.ts           # JWT session create/verify/destroy
│       ├── actions-auth.ts   # Login/logout server actions
│       └── actions-crud.ts   # CRUD server actions for all content types
└── middleware.ts              # Protects /admin/* routes (except /admin/login)
```

### Database Schema

Four main tables managed via Drizzle ORM with Neon PostgreSQL:

- **`projects`** — Research, QI, and audit projects (type, status, specialty, tags, lead authors)
- **`events`** — Upcoming and past events (date, location, virtual flag, registration URL)
- **`showcase`** — Publications, posters, presentations, QI projects, audits (category, authors, DOI)
- **`blog_posts`** — News, training, insights, events (category, author, featured flag)

### Auth

- Admin routes protected by middleware that verifies a JWT cookie (`sparq-admin-session`)
- Login via environment-variable credentials (`ADMIN_USERNAME` / `ADMIN_PASSWORD`)
- Sessions are 7-day JWTs signed with `SESSION_SECRET`

### Design System

- Colour palette derived from SPARQ logo (blue primary `#2563EB`, green secondary `#16A34A`, yellow/coral/orange accents)
- CSS custom properties defined in `globals.css`, mapped to Tailwind via `@theme inline`
- Cards with `rounded-xl`, subtle shadows, hover lift
- Scroll-reveal animations via Framer Motion
- Fixed navbar with backdrop blur

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in: DATABASE_URL, SESSION_SECRET, ADMIN_USERNAME, ADMIN_PASSWORD

# Push schema to database
npm run db:push

# Seed sample data (optional)
npm run db:seed

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run db:generate` | Generate Drizzle migrations |
| `npm run db:migrate` | Run migrations |
| `npm run db:push` | Push schema directly (dev) |
| `npm run db:studio` | Open Drizzle Studio GUI |
| `npm run db:seed` | Seed database with sample data |

## Deployment

Deployed automatically to Vercel on push to `main`. DNS for `sparq.org.uk` points to Vercel.

## Future Works

- Network and profiles
- ORCID import of projects for showcase
