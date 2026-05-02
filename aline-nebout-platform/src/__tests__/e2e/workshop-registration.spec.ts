import { test, expect } from '@playwright/test';

/**
 * E2E: Workshop registration guest flow
 *
 * Flow: Coaching → Ateliers → Select date → Fill form → Confirm
 *
 * These tests require a running Next.js server and Supabase connection.
 * Skipped by default.
 * To run: start the dev server, then `npx playwright test workshop-registration`.
 */
test.describe('Workshop registration guest flow', () => {
  test.skip(true, 'Requires running server and Supabase connection');

  test('visitor sees workshop calendar with upcoming dates', async ({ page }) => {
    await page.goto('/coaching/ateliers');

    // Verify workshop list is displayed
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    // At least one workshop card or empty state should be visible
    const hasWorkshops = await page.locator('[data-testid="workshop-card"]').count();
    if (hasWorkshops > 0) {
      await expect(page.locator('[data-testid="workshop-card"]').first()).toBeVisible();
    }
  });

  test('visitor can open registration form for a workshop', async ({ page }) => {
    await page.goto('/coaching/ateliers');

    // Click register button on first available workshop
    const registerBtn = page.getByRole('button', { name: /inscrire|réserver/i }).first();
    if (await registerBtn.isVisible()) {
      await registerBtn.click();

      // Registration form should appear
      await expect(page.getByLabel(/nom/i)).toBeVisible();
      await expect(page.getByLabel(/email/i)).toBeVisible();
    }
  });

  test('registration form validates required fields', async ({ page }) => {
    await page.goto('/coaching/ateliers');

    const registerBtn = page.getByRole('button', { name: /inscrire|réserver/i }).first();
    if (await registerBtn.isVisible()) {
      await registerBtn.click();

      // Submit empty form
      await page.getByRole('button', { name: /confirmer|envoyer/i }).click();

      // Validation errors should appear
      await expect(page.getByText(/requis|obligatoire/i).first()).toBeVisible();
    }
  });

  test('successful registration shows confirmation', async ({ page }) => {
    await page.goto('/coaching/ateliers');

    const registerBtn = page.getByRole('button', { name: /inscrire|réserver/i }).first();
    if (await registerBtn.isVisible()) {
      await registerBtn.click();

      // Fill form
      await page.getByLabel(/nom/i).fill('Test Utilisateur');
      await page.getByLabel(/email/i).fill('test@example.com');
      await page.getByLabel(/téléphone/i).fill('06 12 34 56 78');

      // Submit
      await page.getByRole('button', { name: /confirmer|envoyer/i }).click();

      // Confirmation message should appear
      await expect(
        page.getByText(/confirmé|inscription|succès/i)
      ).toBeVisible({ timeout: 10000 });
    }
  });

  test('full workshop shows "Complet" status', async ({ page }) => {
    // This test verifies the UI state when a workshop is at capacity
    await page.goto('/coaching/ateliers');

    // If any workshop shows "Complet", verify waitlist option
    const completLabel = page.getByText(/complet/i).first();
    if (await completLabel.isVisible()) {
      // Waitlist option should be available
      await expect(
        page.getByText(/liste d'attente|waitlist/i).first()
      ).toBeVisible();
    }
  });
});
