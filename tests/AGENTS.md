# Tests — Agent Knowledge Base

## Philosophy

This project follows **Test-Driven Development (TDD)**. Tests are written before implementation code. Test names are written as human-readable specifications — they describe *what the system does*, not *how it is implemented*. A failing test suite describes unbuilt features; a passing suite is proof of delivery.

## Directory Structure

```
tests/
├── AGENTS.md          # This file
├── unit/              # Vitest unit and integration tests for src/lib
└── e2e/               # Playwright end-to-end tests against the built site
```

### `unit/`

Contains Vitest tests covering all modules under `src/lib`. Each file mirrors its source counterpart (e.g. `src/lib/foo.ts` → `tests/unit/foo.test.ts`).

### `e2e/`

Contains Playwright tests that run against the production build of the site. Tests cover full user journeys, visual assertions, and accessibility checks.

## Running the Suites

### Unit tests (Vitest)

```bash
npm test
```

Runs all files matching `tests/unit/**/*.test.ts`. Watch mode is available via `npm run test:watch` if configured.

### E2E tests (Playwright)

```bash
npm run test:e2e
```

Playwright spins up a local preview server automatically (see **webServer config** below). Run this only after a successful build.

## Coverage Requirement

**100% coverage is required on `src/lib`.**

Vitest is configured with coverage collection scoped to `src/lib`. CI will fail if any statement, branch, function, or line in that directory falls below 100%. This does not apply to Astro components or pages — those are covered by E2E tests instead.

## Playwright webServer Config

The Playwright config (`playwright.config.ts`) uses Playwright's `webServer` option. It expects:

1. A production build to exist — run `npm run build` first.
2. `npm run preview` to be used as the server command — this serves the `dist/` output on a local port.

If you run `npm run test:e2e` without building first, the preview server will fail to start and all E2E tests will error. Always build before running E2E locally:

```bash
npm run build && npm run test:e2e
```

CI handles this order automatically.

## Accessibility Testing

**axe-core accessibility checks will be added to E2E tests.** Each page-level spec will include an axe scan via `@axe-core/playwright`. Any accessibility violation at the critical or serious level will fail the test. Do not remove or skip these checks without explicit approval.
