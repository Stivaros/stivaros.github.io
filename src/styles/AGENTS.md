# src/styles — Agent Knowledge Base

## Architecture

`global.css` is the only stylesheet. It follows a strict layer hierarchy:

- `@layer base` — element defaults (body, a, :focus-visible, code). Lowest priority.
- `@layer utilities` — semantic single-property aliases (.text-body, .text-muted, .bg-surface, .border-subtle). Sit above components so direct utility application always wins.
- `@layer components` — multi-property UI components that compose utilities. Higher priority than base; lower than utilities applied directly on an element.

## Light/Dark Variant System

`dark:` and `light:` prefixes respond to `html.dark` / `html.light` class toggling, not `prefers-color-scheme`. The `@variant` declarations at the top of `global.css` define these. Dark is the default; no class is needed on `<html>` for dark mode (`:root` sets `color-scheme: dark`).

For complex compound selectors (e.g. `html.light .link-fill a`), the variant macro cannot be applied inside a nested rule — use an explicit `html.light ...` top-level rule instead.

## Link Fill Animation

The `background-image` on `a` and `.link-fill a` uses a raw `linear-gradient` because no Tailwind utility maps to this single-colour fill-from-bottom pattern. All other animation properties (`transition-*`, `bg-bottom`, `bg-no-repeat`, `[background-size:...]`) use `@apply`.

`.link-fill a:hover` has specificity (0,1,1) which beats Tailwind colour utilities at (0,1,0). This guarantees the text colour flip on hover even when `.text-body` or similar is also applied.

Global `a` establishes the resting underline bar (3px). `.link-fill` opts descendant anchors into the fill animation (height grows to 100%). Nav and card links opt out entirely with `bg-none`.

## WCAG Contrast

On `emerald-600` background: `zinc-950` text ≈ 5.9:1 (passes WCAG AA). `white` text ≈ 3.5:1 (fails). Hover text on emerald is always `text-zinc-950`.

## Component Classes

Named component classes in `@layer components` abstract repeated or complex Tailwind class combinations. Adding a new component: place it in `global.css` under `@layer components`, after any components it builds on. The class must be used in at least two places or represent a meaningfully complex composition before warranting abstraction.

**Important**: `@apply` inside `@layer components` cannot reference custom utility classes defined in `@layer utilities` (e.g. `.text-body`, `.text-muted`, `.border-subtle`). Use the underlying Tailwind values directly — e.g. `text-zinc-100 light:text-zinc-900` instead of `text-body`.

| Class | Purpose |
|---|---|
| `.card` | Clickable surface card with themed border |
| `.link-fill` | Wrapper enabling fill-from-bottom link animation |
| `.prose` | Typography for markdown-rendered content (CSS nesting) |
| `.nav-logo` | Site logo anchor, opts out of fill animation |
| `.nav-link` | Inactive nav section link |
| `.nav-link-active` | Active nav section link with emerald border indicator |
| `.section-card` | Homepage section navigation card |
| `.section-card-title` | Label inside `.section-card`, transitions on parent hover |
| `.tab-btn` | Tab button base state (inactive) |
| `.tab-btn-active` | Tab button active state modifier |
| `.tag` | Inline chip for metadata labels (tech tags, categories) |
| `.legacy-banner` | Amber banner for historically migrated posts |
