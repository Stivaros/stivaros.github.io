# stivaros.com — Agent Knowledge Base

This file is the primary entry point for any agent starting work on this repository. Read it fully before making changes. Subdirectories contain their own `AGENTS.md` files with more focused guidance; always check those too.

---

## Project Purpose and Goals

A personal site for stivaros.com — a complete rebrand and rebuild of a 6-year-old Gatsby portfolio. Goals:

- A fast, accessible, statically-generated site that deploys from the `master` branch to GitHub Pages.
- A writing home: two new content streams (Dispatch for tech notes, Systems for case studies) plus an archive of migrated Gatsby blog posts.
- A reference implementation of agentic, documentation-driven development: every non-trivial decision is recorded, every directory has an `AGENTS.md`, tests are behavioural specs, commits follow conventional commit format.

---

## Tech Stack

| Tool | Version | Rationale |
|---|---|---|
| Astro | 5.x | Zero-JS-by-default SSG, first-class Content Collections, TypeScript-native. See `docs/adr/0001-astro-over-gatsby.md`. |
| Tailwind CSS | 4.x | CSS-first config via `@theme`, no PostCSS or `tailwind.config.js` required. See `docs/adr/0002-tailwind-v4.md`. |
| @tailwindcss/vite | 4.x | Vite plugin integration; Astro's bundler is Vite, so this is the correct integration path (not the PostCSS plugin). |
| TypeScript | bundled with Astro 5 | Configured via `astro/tsconfigs/strictest` — maximum type safety. |
| Vitest | 3.x | Unit testing for `src/lib`. Coverage provider is v8; 100% coverage on `src/lib` is enforced. |
| Playwright | 1.45.x | E2E tests against the production build. Includes axe-core accessibility checks. |
| tsx | 4.x | Runs TypeScript scripts directly (e.g. migration scripts). |

Deployment: GitHub Pages via CD on the `master` branch. Site URL: `https://stivaros.com`.

---

## Directory Structure

```
stivaros.github.io/
├── AGENTS.md                  # This file
├── astro.config.mjs           # Astro + Tailwind/Vite plugin config
├── tsconfig.json              # Extends astro/tsconfigs/strictest; defines path aliases
├── vitest.config.ts           # Unit test config, 100% coverage threshold on src/lib
├── playwright.config.ts       # E2E config, uses webServer (build first)
├── package.json               # Scripts and dependencies
├── public/                    # Static assets copied verbatim to dist/
├── src/
│   ├── components/            # Astro components (no framework JS by default)
│   ├── content/               # Content Collections source
│   │   ├── dispatch/          # Tech notes (Markdown/MDX)
│   │   ├── systems/           # Case studies (Markdown/MDX)
│   │   └── archive/           # Migrated Gatsby blog posts (Markdown)
│   ├── layouts/               # Astro layout components
│   ├── lib/                   # Pure TypeScript utilities (100% unit-test coverage required)
│   ├── pages/                 # File-based routing; .astro files
│   └── styles/
│       └── global.css         # Single stylesheet: @import "tailwindcss", @theme tokens, @layer base rules
├── scripts/                   # One-off automation (e.g. blog migration); run via tsx
├── tests/
│   ├── AGENTS.md              # Test-specific guidance
│   ├── unit/                  # Vitest tests mirroring src/lib structure
│   └── e2e/                   # Playwright end-to-end tests
└── docs/
    └── adr/                   # Architecture Decision Records (see below)
```

### Path Aliases (tsconfig.json)

| Alias | Resolves to |
|---|---|
| `@components/*` | `src/components/*` |
| `@layouts/*` | `src/layouts/*` |
| `@lib/*` | `src/lib/*` |
| `@styles/*` | `src/styles/*` |

Always use aliases in import statements; never use relative `../../` paths across directory boundaries.

---

## Running the Project

### Development

```bash
npm run dev
```

Starts the Astro dev server with HMR. Tailwind is processed via the Vite plugin on every save.

### Type Checking

```bash
npm run typecheck
```

Runs `astro check`, which type-checks `.astro` files and `.ts` files together.

### Build

```bash
npm run build
```

Produces a fully static site in `dist/`. Required before running E2E tests.

### Preview

```bash
npm run preview
```

Serves the `dist/` output locally. Used by Playwright's `webServer` config.

### Unit Tests

```bash
npm test            # single run
npm run test:watch  # watch mode
npm run test:coverage  # with coverage report
```

### E2E Tests

```bash
npm run build && npm run test:e2e
```

Playwright requires the production build. Do not run `test:e2e` without building first.

---

## CI/CD

Two GitHub Actions workflows live in `.github/workflows/`.

### CI (`ci.yml`)

Triggers on every push to any branch, and on pull requests targeting `master`.

Three jobs run:

- `typecheck` and `unit-test` run in parallel. `typecheck` runs `npm run typecheck` (astro check); `unit-test` runs `npm test` (vitest run) and must pass with zero failures.
- `build` runs `npm run build` and depends on both `typecheck` and `unit-test` passing first.

All jobs use Node 22 on `ubuntu-latest` and share an npm cache keyed on `package-lock.json`.

Playwright E2E tests are not included in CI yet — they require a browser install step and will be added separately.

### Deploy (`deploy.yml`)

Triggers only when the CI workflow completes successfully on the `master` branch (via `workflow_run`). This means a deploy is never attempted unless all CI checks have passed.

The job:
1. Checks out the repo with full history (`fetch-depth: 0`).
2. Installs dependencies and runs `npm run build` to produce `dist/`.
3. Uploads `dist/` as a GitHub Pages artifact and deploys it using the official `actions/deploy-pages@v4` action.

The `environment` is set to `github-pages` so the deployment URL is surfaced in the GitHub UI.

### Custom Domain

`public/CNAME` contains `stivaros.com`. Astro copies everything in `public/` to `dist/` verbatim during the build, so the custom domain is handled automatically — no extra workflow step is required.

---

## Design System

### Colour Modes

Dark mode is the **default**. The `<html>` element carries `class="dark"` by default (or no class — dark is `:root`). Light mode is activated by `class="light"` on `<html>`.

| Token | Dark value | Light value |
|---|---|---|
| Background | `zinc-950` | `emerald-50` |
| Body text | `zinc-100` | `zinc-900` |
| Accent | `emerald-400` | `emerald-700` |

### Accent Usage Rules

Emerald is the sole accent colour. It must be used **sparingly** and only for these four purposes:

1. **Link underlines** — `decoration-emerald-400` (dark) / `decoration-emerald-700` (light), `decoration-2`, `underline-offset-4`.
2. **Section `<h2>` left borders** — `border-l-2 border-emerald-400`.
3. **Focus rings** — `ring-2 ring-emerald-400 ring-offset-2`.
4. **Code block left borders** — `border-l-2 border-emerald-400 pl-1`.

Do not use emerald for backgrounds, fill colours, or decorative purposes outside this list.

### Typography

- Sans: `ui-sans-serif, system-ui, sans-serif` (`--font-sans`)
- Mono: `"JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace` (`--font-mono`)

All tokens are defined in `src/styles/global.css` under `@theme`. Do not hardcode font stacks elsewhere.

### Stylesheet Architecture

There is exactly one stylesheet: `src/styles/global.css`. It:

1. Imports Tailwind: `@import "tailwindcss";`
2. Declares custom tokens under `@theme { }`.
3. Applies base styles under `@layer base { }`.

There are no per-component CSS files. Tailwind utility classes are applied directly in `.astro` templates. Avoid `<style>` blocks in components unless unavoidable.

---

## Content Collections

Astro Content Collections provide type-safe access to Markdown/MDX files. All collections live under `src/content/`.

### Dispatch (`src/content/dispatch/`)

Short-form tech notes. Intended for frequent, lower-stakes writing. Schema: `title`, `date`, `tags`, optional `description`.

### Systems (`src/content/systems/`)

Long-form case studies. Schema: `title`, `impact`, `technology`, optional `description`, optional `logicDiagram` (path to a diagram asset used by the Logic Toggle component).

### Archive (`src/content/archive/`)

Migrated posts from the Gatsby blog at `../blog` (relative to this repo root). These are migrated via a script in `scripts/`. Frontmatter is normalised to match the Archive schema during migration. Do not edit archive posts by hand; re-run the migration script if the source changes.

---

## Migration Scripts

Scripts live in `scripts/` and are executed with `tsx`:

```bash
npx tsx scripts/<script-name>.ts
```

The primary migration script copies posts from `../blog` into `src/content/archive/`, normalising frontmatter. See the script source for details on field mapping and slug generation.

---

## Coding Conventions

### Naming Over Comments

Write code that explains itself through precise naming. Use comments only for non-obvious *why*, never for *what*. Prefer:

- Descriptive function names: `formatISODateToDisplay` not `formatDate`.
- Descriptive variable names: `publishedAtISO` not `date`.
- Descriptive test names: `"renders the post title as an h1"` not `"test 1"`.

### Test-Driven Development

Write tests before implementation. A failing test suite describes unbuilt features; a passing suite is proof of delivery. Test names are behavioural specifications written in plain English.

Unit tests mirror source files: `src/lib/foo.ts` is covered by `tests/unit/foo.test.ts`.

### Conventional Commits

All commits must follow the Conventional Commits specification:

```
<type>(<scope>): <description>

[optional body]
```

Common types: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `style`. Scope is optional but encouraged (e.g. `feat(dispatch): add reading-time utility`).

### TypeScript Strictness

The project extends `astro/tsconfigs/strictest`. This means:

- `strict: true` (all strict flags enabled).
- No implicit any.
- No unused locals or parameters.
- No unchecked indexed access.

Do not use `any` or `@ts-ignore` without a documented reason in a comment on the same line.

### Component Authoring

- Default to `.astro` components. Introduce a framework (React, Svelte, etc.) only when interactivity cannot be achieved with vanilla JS or Astro's built-in `<script>` tags. This decision requires an ADR.
- Keep components small and single-purpose.
- Props must be typed via TypeScript interfaces in the component frontmatter.

---

## Architecture Decision Records

ADRs are stored in `docs/adr/`. Each file is numbered sequentially: `NNNN-kebab-case-title.md`.

Current ADRs:

| ADR | Title |
|---|---|
| 0001 | Astro over Gatsby (and Next.js) |
| 0002 | Tailwind v4 (CSS-first) over v3 |

When making a non-trivial architectural or design-system decision, write an ADR before (or alongside) the implementation. Use the format documented in the existing ADR files.

---

## Things to Know Before Changing Anything

- The `src/lib/` directory requires 100% test coverage. Adding code there without tests will fail CI.
- E2E tests require a production build. Always run `npm run build` before `npm run test:e2e`.
- Accent (emerald) usage must stay within the four permitted contexts listed above.
- Do not add a `tailwind.config.js`. All Tailwind configuration is CSS-first in `global.css`.
- Do not add a PostCSS config. The `@tailwindcss/vite` plugin handles everything.
- The `archive` collection is migration-managed; do not edit its files by hand.
- All content schema changes require updating the corresponding collection config and any migration scripts.
