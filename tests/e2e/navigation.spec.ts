import { expect, test } from '@playwright/test';

test('navigates from the home page to the dispatch index via the nav link', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('navigation').getByRole('link', { name: 'dispatch', exact: true }).click();
  await expect(page).toHaveURL(/\/dispatch$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Dispatch');
});

test('navigates from the dispatch index to a post and renders the post title as an h1', async ({ page }) => {
  await page.goto('/dispatch');
  await page.getByRole('main').getByRole('link').first().click();
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('navigates from the home page to the archive index via the nav link', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('navigation').getByRole('link', { name: 'archive', exact: true }).click();
  await expect(page).toHaveURL(/\/archive$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Archive');
});

test('navigates from the archive index to a legacy post and renders the Historical banner', async ({ page }) => {
  await page.goto('/archive');
  await page.getByRole('main').getByRole('link').first().click();
  const banner = page.locator('[role="note"]');
  await expect(banner).toBeVisible();
  await expect(banner).toContainText('Historical post');
});

test('shows a Historical badge next to every post on the archive index', async ({ page }) => {
  await page.goto('/archive');
  await expect(page.getByText('Historical').first()).toBeVisible();
});
