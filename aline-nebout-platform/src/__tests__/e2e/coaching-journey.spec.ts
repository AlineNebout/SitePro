import { test, expect } from '@playwright/test';

/**
 * E2E: Coaching user journey
 *
 * Flow: Register → Login → Dashboard → Exercises → Progress
 *
 * These tests require a running Next.js server and Supabase connection.
 * Skipped by default.
 * To run: start the dev server, then `npx playwright test coaching-journey`.
 *
 * Note: Performance tests (Lighthouse CI, LCP, bundle analysis) are deferred
 * to CI pipeline setup. See tasks 30.6-30.8.
 */
test.describe('Coaching user journey', () => {
  test.skip(true, 'Requires running server and Supabase connection');

  test('visitor can access registration page', async ({ page }) => {
    await page.goto('/inscription');

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/mot de passe/i).first()).toBeVisible();
  });

  test('registration form validates inputs', async ({ page }) => {
    await page.goto('/inscription');

    // Submit empty form
    await page.getByRole('button', { name: /créer|inscrire/i }).click();

    // Validation errors should appear
    await expect(page.getByText(/requis|obligatoire/i).first()).toBeVisible();
  });

  test('visitor can access login page', async ({ page }) => {
    await page.goto('/connexion');

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/mot de passe/i)).toBeVisible();
  });

  test('login with invalid credentials shows generic error', async ({ page }) => {
    await page.goto('/connexion');

    await page.getByLabel(/email/i).fill('wrong@example.com');
    await page.getByLabel(/mot de passe/i).fill('wrongpassword');
    await page.getByRole('button', { name: /connecter/i }).click();

    // Generic error message (Property 6 — no email/password hint)
    await expect(
      page.getByText(/identifiants incorrects/i)
    ).toBeVisible({ timeout: 10000 });
  });

  test('authenticated user sees dashboard', async ({ page }) => {
    // This test assumes a test user exists in Supabase
    await page.goto('/connexion');

    await page.getByLabel(/email/i).fill('test-coaching@example.com');
    await page.getByLabel(/mot de passe/i).fill('testpassword123');
    await page.getByRole('button', { name: /connecter/i }).click();

    // Should redirect to dashboard
    await expect(page).toHaveURL(/tableau-de-bord/, { timeout: 10000 });
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('dashboard shows exercise programs section', async ({ page }) => {
    // Assumes authenticated session from previous test or test setup
    await page.goto('/exercices');

    // Should show exercise programs or empty state
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('progress page shows charts or encouragement message', async ({ page }) => {
    await page.goto('/progression');

    // Should show progress charts or "complete more sessions" message
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
});

/**
 * Performance tests (Tasks 30.6-30.8)
 *
 * These are deferred to CI pipeline setup:
 *
 * 30.6 — Lighthouse CI: Run `npx lhci autorun` on all public pages.
 *         Target: Performance score >= 90 on desktop.
 *         Requires: @lhci/cli package and lighthouserc.js config.
 *
 * 30.7 — 3D scenes LCP: Verify LCP < 2.5s on throttled 4G.
 *         Requires: Lighthouse with network throttling or WebPageTest.
 *
 * 30.8 — Bundle analysis: Verify 3D code-splitting with `next build --analyze`.
 *         Requires: @next/bundle-analyzer package.
 *         Check that 3D scene chunks are separate from main bundle.
 */
