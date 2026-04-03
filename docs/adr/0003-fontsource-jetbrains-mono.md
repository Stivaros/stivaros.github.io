# ADR 0003 — Self-hosted JetBrains Mono via @fontsource-variable

## Status

Accepted

## Context

The PRD specifies JetBrains Mono (preferred) or IBM Plex Mono as the monospace
typeface for code and data, loaded via `@fontsource`. The font stack was declared
in `src/styles/global.css` from the start, but the font itself was not installed
— it fell back to `ui-monospace` (the OS system monospace) until this ADR was
acted on.

Two loading strategies were available:

1. **External CDN** (e.g. Google Fonts) — zero build complexity but introduces
   a third-party network dependency, a privacy concern (CDN logs visitor IPs),
   and a potential GDPR issue for EU visitors.

2. **Self-hosted via @fontsource** — fonts are bundled as npm packages and served
   from the same origin as the site. No external requests, no privacy exposure,
   works offline and in CI.

Within @fontsource, two variants exist:

- `@fontsource/jetbrains-mono` — static files, one per weight/style combination.
  Requires explicit imports per weight.
- `@fontsource-variable/jetbrains-mono` — a single variable font file covering
  all weights (100–800) via the `wght` axis. One import, smaller total payload
  than loading multiple static weights separately.

## Decision

Use `@fontsource-variable/jetbrains-mono`. Import it once at the top of
`src/styles/global.css` so it is bundled by Vite alongside Tailwind.

The `technical-prd.md` file in the repo root (which was a placeholder left over
from project initialisation) was deleted at the same time, as it contained no
content and the actual requirements are fully captured in `prd.md`.

## Consequences

**Easier:**
- Font is guaranteed to load regardless of network conditions or CDN availability.
- No third-party requests means cleaner CSP headers if added later.
- Variable font covers all weights with a single network request.

**Harder:**
- The font woff2 file adds to the bundle. JetBrains Mono variable is ~100 KB —
  acceptable for a personal site, worth revisiting if performance budgets tighten.
- Updating the font means updating the npm package, not just a CDN URL.
