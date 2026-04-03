import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('home page has no automatically detectable accessibility violations', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test('dispatch index has no automatically detectable accessibility violations', async ({ page }) => {
  await page.goto('/dispatch');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test('archive index has no automatically detectable accessibility violations', async ({ page }) => {
  await page.goto('/archive');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test('a dispatch post page has no automatically detectable accessibility violations', async ({ page }) => {
  await page.goto('/dispatch/hello-dispatch');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test('an archive post page has no automatically detectable accessibility violations', async ({ page }) => {
  await page.goto('/archive/hello-archive');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
