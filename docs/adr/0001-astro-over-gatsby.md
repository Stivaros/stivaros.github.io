# ADR 0001 — Astro over Gatsby (and Next.js)

## Status

Accepted

## Context

stivaros.com was previously a Gatsby portfolio site, roughly 6 years old. A ground-up rebuild was planned. The framework choice was the first and most significant decision.

Three options were considered:

**Gatsby** — the incumbent. By 2024 Gatsby had been acquired by Netlify and effectively entered maintenance mode. The plugin ecosystem had stagnated, React 18 support was late and partial, and the team had been disbanded. Continuing on Gatsby meant accepting a dead dependency with no credible upgrade path.

**Next.js** — the dominant React-based option. Full-featured, large ecosystem, actively developed. However, Next.js is primarily a server-rendered framework with SSG as a secondary mode. Its React Server Components model introduces significant complexity. For a personal site with no authenticated routes and no server-side personalisation, a server-rendering framework is architectural overfitting. Next.js also couples the project permanently to React and the Vercel deployment model.

**Astro** — a content-focused, component-model-agnostic SSG. Ships zero JavaScript to the browser by default. First-class Content Collections API with TypeScript-inferred schema. No framework lock-in: UI framework components can be added incrementally with explicit `client:` hydration directives. Outputs a fully static site compatible with any CDN or static host.

The site's requirements are: static pages, Markdown-driven content, fast load times, low maintenance overhead, and compatibility with GitHub Pages (the existing deployment target).

## Decision

Use Astro 5 as the site framework.

Content Collections provide type-safe, schema-validated access to Markdown and MDX files, replacing the GraphQL data layer that was one of Gatsby's more operationally complex aspects. Static output (`output: 'static'` in `astro.config.mjs`) is a first-class mode with no trade-offs relative to Gatsby's default output.

No UI framework is introduced at this stage. All components are `.astro` files. If interactivity is needed later, the correct path is to evaluate the need, write an ADR, and introduce only what is required.

## Consequences

**Easier:**
- Zero JavaScript shipped to the browser by default; performance is excellent without tuning.
- Content Collections replace GraphQL with a typed, file-system-based API that is easier to understand and maintain.
- No React dependency means no exposure to React's release cadence, breaking changes, or bundle overhead.
- TypeScript-native: Astro components have a typed frontmatter block; the `astro/tsconfigs/strictest` base config is actively maintained.
- GitHub Pages compatibility is trivially maintained — the output is plain static files.

**Harder:**
- The React ecosystem (component libraries, hooks, tooling) is not available without explicitly opting in per component. Agents and developers accustomed to React need to learn the Astro component model.
- Astro's `<script>` tag model for client-side interactivity has different semantics than React state management; non-trivial UI interactions require more thought.
- Astro is younger than Next.js; the community and third-party integration surface is smaller. Some integrations (e.g. analytics, search) require more manual wiring.
- Migrating the existing Gatsby blog posts requires a bespoke migration script rather than a first-party tool.
