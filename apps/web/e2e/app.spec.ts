import { test, expect } from '@playwright/test';

test('app loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Bookmarker AI/);
});

test('health indicator component exists', async ({ page }) => {
  await page.goto('/');

  // Check that the health indicator component is in the DOM
  const healthIndicator = page.locator('app-health-indicator');
  await expect(healthIndicator).toHaveCount(1);

  // Check if it contains a badge with the expected classes
  const badge = page.locator('app-health-indicator .badge');
  await expect(badge).toHaveCount(1);
});
