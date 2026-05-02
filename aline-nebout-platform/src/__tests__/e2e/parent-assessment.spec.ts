import { test, expect } from '@playwright/test';

/**
 * E2E: Parent self-assessment flow
 *
 * Flow: Reflexes → Parents → Check items → See recommendation → Book
 *
 * These tests require a running Next.js server and are skipped by default.
 * To run: start the dev server, then `npx playwright test parent-assessment`.
 */
test.describe('Parent self-assessment flow', () => {
  test.skip(true, 'Requires running server and Supabase connection');

  test('parent navigates to reflexes parents page', async ({ page }) => {
    await page.goto('/reflexes');

    // Click on parent CTA
    await page.getByRole('link', { name: /parent|enfant|difficultés/i }).first().click();

    // Verify parents page loads
    await expect(page).toHaveURL(/\/reflexes\/parents/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('checklist items are interactive', async ({ page }) => {
    await page.goto('/reflexes/parents');

    // Find checkboxes
    const checkboxes = page.locator('input[type="checkbox"]');
    const count = await checkboxes.count();
    expect(count).toBeGreaterThan(0);

    // Check first item
    await checkboxes.first().check();
    await expect(checkboxes.first()).toBeChecked();
  });

  test('checking 3+ items shows recommendation', async ({ page }) => {
    await page.goto('/reflexes/parents');

    const checkboxes = page.locator('input[type="checkbox"]');

    // Check 3 items to trigger threshold
    for (let i = 0; i < 3; i++) {
      await checkboxes.nth(i).check();
    }

    // Recommendation should appear
    await expect(
      page.getByText(/bilan|réflexes archaïques|pourrait aider/i)
    ).toBeVisible();
  });

  test('checking fewer than 3 items does not show recommendation', async ({ page }) => {
    await page.goto('/reflexes/parents');

    const checkboxes = page.locator('input[type="checkbox"]');

    // Check only 2 items
    await checkboxes.nth(0).check();
    await checkboxes.nth(1).check();

    // Recommendation should NOT appear
    await expect(
      page.getByText(/bilan|réflexes archaïques|pourrait aider/i)
    ).not.toBeVisible();
  });

  test('recommendation includes booking CTA', async ({ page }) => {
    await page.goto('/reflexes/parents');

    const checkboxes = page.locator('input[type="checkbox"]');
    for (let i = 0; i < 3; i++) {
      await checkboxes.nth(i).check();
    }

    // Booking CTA should be visible
    await expect(
      page.getByRole('link', { name: /rendez-vous|bilan/i })
    ).toBeVisible();
  });
});
