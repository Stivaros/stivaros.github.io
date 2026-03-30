# ADR 0002 — Tailwind v4 (CSS-first) over Tailwind v3

## Status

Accepted

## Context

Tailwind CSS is the chosen utility framework for this project. At the time of the rebuild, two major versions were available: v3 (stable, widely documented) and v4 (newly released, CSS-first architecture).

Tailwind v3 uses a JavaScript configuration file (`tailwind.config.js`) as the source of truth for the design system. It requires PostCSS as a build-time dependency and a PostCSS config file. The `@tailwindcss/vite` plugin does not exist in v3; integration with Vite-based tools was done through the PostCSS plugin.

Tailwind v4 redesigns the configuration layer entirely. The `tailwind.config.js` file is eliminated. Design tokens are declared in CSS using a `@theme { }` block inside the stylesheet. The framework is imported with a single `@import "tailwindcss"` directive. A dedicated Vite plugin (`@tailwindcss/vite`) replaces the PostCSS plugin, removing the need for a PostCSS config entirely. Native CSS `@import` resolution is handled by the plugin directly.

This project uses Astro 5, which bundles Vite as its build tool. The `@tailwindcss/vite` plugin is therefore the idiomatic integration path.

## Decision

Use Tailwind CSS v4 with the `@tailwindcss/vite` plugin. All design tokens are declared in `src/styles/global.css` under the `@theme { }` block. There is no `tailwind.config.js` and no `postcss.config.*` file in this repository.

The stylesheet architecture is intentionally minimal: a single file (`src/styles/global.css`) contains the Tailwind import, the theme tokens, and the base layer overrides. Utility classes are applied directly in `.astro` templates.

## Consequences

**Easier:**
- Eliminating `tailwind.config.js` and `postcss.config.js` reduces the number of configuration files agents and developers need to understand and keep in sync.
- Design tokens live in CSS, which is the natural language for styling concerns. There is no context-switching between a JavaScript config file and a stylesheet.
- The `@tailwindcss/vite` plugin handles `@import` resolution natively, removing the need for `postcss-import` or equivalent.
- Build performance is improved: the v4 engine is rewritten in Rust (via Lightning CSS) and is substantially faster than v3's Node-based scanner.
- Arbitrary value syntax and `@apply` behave consistently with the rest of the CSS cascade.

**Harder:**
- Tailwind v4 is newer; community resources, Stack Overflow answers, and third-party tutorials predominantly describe v3 patterns. Agents must be careful not to apply v3 configuration patterns (e.g. adding a `tailwind.config.js`, using `theme.extend`, or installing the PostCSS plugin) to this codebase.
- Some v3 plugins and community presets do not yet have v4-compatible releases. Any third-party Tailwind plugin must be evaluated for v4 compatibility before adoption.
- The `@theme` token naming convention differs from v3's `theme()` function and JavaScript token keys; variable names follow the CSS custom property convention (`--color-emerald-400`, etc.).
