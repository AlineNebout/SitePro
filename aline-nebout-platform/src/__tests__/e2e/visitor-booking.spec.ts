import { test, expect } from '@playwright/test';

/**
 * E2E: Visitor books osteopathy appointment
 *
 * Flow: Landing → Specialty → Doctolib
 *
 * These tests require a running Next.js server and are skipped by default.
 * To run: start the dev server, then `npx playwright test visitor-booking`.
 */
test.describe('Visitor books osteopathy appointment', () => {
  test.skip(true, 'Requires running server and Supabase connection');

  test('visitor lands on osteopathy page and sees hero section', async ({ page }) => {
    // Navigate to osteopathy landing
    await page.goto('/osteopathie');

    // Verify hero section is visible with headline and CTA
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByRole('link', { name: /doctolib|rendez-vous/i })).toBeVisible();
  });

  test('visitor navigates to a specialty page', async ({ page }) => {
    await page.goto('/osteopathie');

    // Click on a specialty card (e.g., "Femmes enceintes")
    await page.getByText(/femmes enceintes|nourrissons|sport/i).first().click();

    // Verify specialty page loads with breadcrumb
    await expect(page.locator('nav[aria-label="Breadcrumb"]')).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('visitor clicks Doctolib CTA and new tab opens', async ({ page, context }) => {
    await page.goto('/osteopathie');

    // Listen for new tab
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      page.getByRole('link', { name: /doctolib|rendez-vous/i }).first().click(),
    ]);

    // Verify Doctolib URL
    expect(newPage.url()).toContain('doctolib.fr');
  });

  test('pricing information is displayed (65€ / 45 min)', async ({ page }) => {
    await page.goto('/osteopathie');
    await expect(page.getByText('65€')).toBeVisible();
  });

  test('phone number is a clickable tel: link', async ({ page }) => {
    await page.goto('/osteopathie');
    const phoneLink = page.locator('a[href^="tel:"]');
    await expect(phoneLink).toBeVisible();
  });
});
