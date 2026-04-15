import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('home page has no automatically detectable accessibility violations', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test('thoughts index has no automatically detectable accessibility violations', async ({ page }) => {
  await page.goto('/thoughts');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test('archive index has no automatically detectable accessibility violations', async ({ page }) => {
  await page.goto('/archive');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test('systems index has no automatically detectable accessibility violations', async ({ page }) => {
  await page.goto('/systems');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test('a thoughts post page has no automatically detectable accessibility violations', async ({ page }) => {
  await page.goto('/thoughts/hello-thoughts');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test('an archive post page has no automatically detectable accessibility violations', async ({ page }) => {
  await page.goto('/archive/hello-archive');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test('a systems post page has no automatically detectable accessibility violations', async ({ page }) => {
  await page.goto('/systems/hello-systems');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
