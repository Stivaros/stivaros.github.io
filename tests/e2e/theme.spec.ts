import { expect, test } from '@playwright/test';

test('defaults to dark mode on first visit with no localStorage preference', async ({ page }) => {
  // Clear any saved preference before visiting
  await page.goto('/');
  await page.evaluate(() => localStorage.removeItem('theme'));
  await page.reload();

  const htmlClass = await page.locator('html').getAttribute('class');
  expect(htmlClass).toContain('dark');
  expect(htmlClass).not.toContain('light');
});

test('switches to light mode when the toggle is clicked', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.removeItem('theme'));
  await page.reload();

  await page.click('#theme-toggle');

  const htmlClass = await page.locator('html').getAttribute('class');
  expect(htmlClass).toContain('light');
  expect(htmlClass).not.toContain('dark');
});

test('persists the light mode preference across page loads', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.setItem('theme', 'light'));
  await page.reload();

  const htmlClass = await page.locator('html').getAttribute('class');
  expect(htmlClass).toContain('light');
  expect(htmlClass).not.toContain('dark');

  const stored = await page.evaluate(() => localStorage.getItem('theme'));
  expect(stored).toBe('light');
});

test('switches back to dark mode when toggled again', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.setItem('theme', 'light'));
  await page.reload();

  await page.click('#theme-toggle');

  const htmlClass = await page.locator('html').getAttribute('class');
  expect(htmlClass).toContain('dark');
  expect(htmlClass).not.toContain('light');

  const stored = await page.evaluate(() => localStorage.getItem('theme'));
  expect(stored).toBe('dark');
});
