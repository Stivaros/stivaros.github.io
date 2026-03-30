# Product Requirements Document — stivaros.com

## 1. Project Goal

Build a clean-slate, high-performance Astro site in the `stivaros/stivaros.github.io` repository. This replaces the existing Gatsby template and integrates archived content from `stivaros/blog`.

The site deploys to **stivaros.com** (GitHub Pages user site). The legacy Gatsby blog lives at blog.stivaros.com and remains untouched; its posts are migrated into the archive collection.

---

## 2. Technical Stack

| Concern | Choice |
|---|---|
| Framework | Astro 4.x/5.x (SSG mode) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS |
| Unit/Integration Testing | Vitest |
| E2E Testing | Playwright |
| Deployment | GitHub Pages via GitHub Actions |

---

## 3. Directory Structure

```
/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── docs/
│   └── adr/                  # Architecture Decision Records
├── public/
├── scripts/
│   └── migrate-archive.ts    # One-time Gatsby → Astro migration
├── src/
│   ├── components/           # Shared UI (Atomic design)
│   ├── content/              # Astro Content Collections
│   │   ├── dispatch/         # Weekly technical notes
│   │   ├── systems/          # Portfolio / Case studies
│   │   └── archive/          # Migrated Gatsby posts
│   ├── layouts/              # BaseLayout, PostLayout
│   ├── lib/                  # Logic, utils, parsers
│   ├── pages/                # File-based routing
│   └── styles/               # Global CSS / Tailwind entry
├── tests/
│   ├── unit/                 # Vitest specs
│   └── e2e/                  # Playwright specs
├── AGENTS.md                 # Top-level agent knowledge base
├── astro.config.mjs
├── vitest.config.ts
└── playwright.config.ts
```

---

## 4. Requirement: TDD Implementation

The builder agent must not write component or library code without first writing the test.

### R1 — Unit Testing (Vitest)

- All utility functions in `src/lib/` must have 100% test coverage.
- The migration script must be unit-tested to confirm frontmatter transformation is accurate.
- Test names must read as behavioural specifications (e.g. `"transforms a Gatsby date string into a JS Date object"`).

### R2 — E2E Testing (Playwright)

- **Navigation test**: Assert that Home → Dispatch → Post works end-to-end.
- **Archive test**: Assert that Home → Archive → Legacy Post renders with the correct "Historical" banner.
- **Theme test**: Verify that the dark/light mode toggle persists its state in `localStorage`.
- **Accessibility test**: All pages must pass `axe-core` checks embedded in Playwright.

---

## 5. Content Schema & Migration Logic

### 5.1 Content Collections (`src/content/config.ts`)

```ts
Dispatch: { title: string; date: Date; tags: string[] }

Systems:  { title: string; impact: string; technology: string[]; logicDiagram?: string }

Archive:  { title: string; date: Date; originalUrl: string; isLegacy: boolean }
```

All three collections are stubbed with placeholder markdown files at initialisation. Real Dispatch and Systems content will be authored later.

### 5.2 Migration Script (`scripts/migrate-archive.ts`)

The one-time script must:

1. Read `.md` files from the cloned `../blog` directory (path passed at runtime; default `../blog`).
2. Map Gatsby frontmatter keys to the Astro `Archive` schema.
3. Prepend a standard **Archive Warning** callout to each post body.
4. Be unit-tested before implementation; the key test case is:
   > `"transforms a Gatsby date string into a JS Date object"`

---

## 6. Visual & UI Requirements

### Palette

Both modes share the emerald hue family; luminosity inverts between them.

**Dark mode (default)**

| Role | Token | Hex |
|---|---|---|
| Background | `zinc-950` | #09090b |
| Surface | `zinc-900` | #18181b |
| Border | `zinc-800` | #27272a |
| Accent | `emerald-400` | #34d399 |
| Text primary | `zinc-100` | #f4f4f5 |
| Text muted | `zinc-400` | #a1a1aa |

**Light mode (pastel)**

| Role | Token | Hex |
|---|---|---|
| Background | `emerald-50` | #ecfdf5 |
| Surface | `white` | #ffffff |
| Border | `emerald-100` | #d1fae5 |
| Accent | `emerald-700` | #047857 |
| Text primary | `zinc-900` | #18181b |
| Text muted | `zinc-600` | #52525b |

The accent intentionally shifts luminosity (`emerald-400` → `emerald-700`) to maintain WCAG AA contrast on both background extremes while preserving hue coherence. Pastels are used exclusively as backgrounds, never for text or interactive elements.

**Accent usage rules**: Emerald is a touch of colour, not a dominant presence. It is the signature detail of the design — used to create visual tension against an otherwise monochrome layout.

Apply it to:
- **Link underlines** — thick, deliberate (`decoration-2` or `decoration-[3px]`, with `underline-offset-4`). This is the primary brutalist-editorial motif.
- **Section heading left-borders** — `border-l-4 border-emerald-400 pl-3` as a structural marker on `<h2>` level headings.
- **Focus rings** — keyboard navigation affordance.
- **Active nav indicators** — a bottom or left border on the current route.
- **Inline code borders** — a left accent on code blocks.

Do not use emerald for body text, headings (as colour), or large filled UI regions. The restraint is the design.

### Typography

- **UI copy**: System sans-serif stack (`ui-sans-serif, system-ui, sans-serif`).
- **Code & data**: JetBrains Mono (preferred) or IBM Plex Mono, loaded via `@fontsource`.

### Components

- **Logic Toggle**: A component used in Systems posts that switches between `slot="prose"` and `slot="diagram"` views.
- No heavy animation. Transitions should be minimal (opacity/translate, ≤150 ms).

### Accessibility

- Must pass `axe-core` checks embedded in Playwright E2E suite.
- Colour contrast ratios must meet WCAG AA as a minimum.

---

## 7. Deployment & Cleanup

- **CI**: GitHub Actions runs `npm test` and `npm run build` on every push/PR.
- **CD**: Deploys to GitHub Pages only on successful `master` branch builds.
- **Custom domain**: `stivaros.com` — a `CNAME` file must be present in `public/`.
- **Cleanup**: All files from the old Gatsby template must be deleted before the first Astro commit.

---

## 8. Agentic Development Standards

This section governs how the builder agent works. It is as important as the technical requirements.

### 8.1 Commit Discipline

- Use **Conventional Commits** (`feat:`, `fix:`, `chore:`, `test:`, `docs:`, `refactor:`).
- Commit **atomically**: one logical change per commit.
- Commit messages may (and should) include a body with relevant context — *why* this change was made, what was considered and rejected, any gotchas.

### 8.2 Code Readability Over Comments

- Prefer **descriptive variable and function names** over inline comments.
- Comments are permitted only where the intent cannot be conveyed by naming alone.
- Test names are specifications: write them in plain English describing the behaviour under test.

### 8.3 Architecture Decision Records (ADRs)

- Stored in `docs/adr/`.
- Written whenever a non-obvious architectural or tooling choice is made.
- Format: `NNNN-short-title.md` (e.g. `0001-astro-over-nextjs.md`).
- Each ADR contains: **Status**, **Context**, **Decision**, **Consequences**.

### 8.4 AGENTS.md Files

- A top-level `AGENTS.md` describes the project, stack, conventions, and how to navigate the codebase for an agent starting fresh.
- Additional `AGENTS.md` files may be placed in sub-directories (e.g. `tests/AGENTS.md`) as domain-specific knowledge accumulates.
- The builder agent must keep these files up to date as the project evolves.

### 8.5 Knowledge Capture

The goal is to store as much *building knowledge* as possible in the repository itself. Future agents (and the human author) should be able to reconstruct *why* the site is built the way it is, not just *what* it does.

---

## 9. Build Order

1. Scaffold Astro project with Tailwind + TypeScript strict; delete old Gatsby files.
2. Configure Vitest; write a dummy failing test to confirm the harness works.
3. Configure Playwright; write a dummy failing E2E test.
4. Write initial `AGENTS.md` and first ADR.
5. Define Content Collections schema (`src/content/config.ts`) + stub content files.
6. Develop migration script — **tests first**.
7. Build `BaseLayout` and `PostLayout` — **tests first**.
8. Build core pages: Home, Dispatch index, Archive index.
9. Implement dark/light mode toggle.
10. Configure GitHub Actions (CI + CD to GitHub Pages with `stivaros.com` CNAME).
