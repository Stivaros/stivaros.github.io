import { expect, test } from '@playwright/test';

test('LogicToggle renders with the Prose tab active by default', async ({ page }) => {
  await page.goto('/systems/hello-systems');
  const proseTab = page.locator('#tab-prose');
  await expect(proseTab).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('#panel-prose')).toBeVisible();
  await expect(page.locator('#panel-diagram')).toBeHidden();
});

test('LogicToggle switches to the Diagram tab when clicked', async ({ page }) => {
  await page.goto('/systems/hello-systems');
  await page.locator('#tab-diagram').click();

  await expect(page.locator('#tab-diagram')).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('#tab-prose')).toHaveAttribute('aria-selected', 'false');
  await expect(page.locator('#panel-diagram')).toBeVisible();
  await expect(page.locator('#panel-prose')).toBeHidden();
});

test('LogicToggle switches back to the Prose tab when clicked again', async ({ page }) => {
  await page.goto('/systems/hello-systems');
  await page.locator('#tab-diagram').click();
  await page.locator('#tab-prose').click();

  await expect(page.locator('#tab-prose')).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('#tab-diagram')).toHaveAttribute('aria-selected', 'false');
  await expect(page.locator('#panel-prose')).toBeVisible();
  await expect(page.locator('#panel-diagram')).toBeHidden();
});
