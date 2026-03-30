import { expect, test } from '@playwright/test';

test('fails intentionally to prove Playwright is wired up — delete this test once confirmed', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toHaveText('this text does not exist');
});
