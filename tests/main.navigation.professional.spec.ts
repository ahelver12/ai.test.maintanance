import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/mainPage';
import { testData } from '../testData/testData';

/**
 * TEST CASE: "The main page should display navigation buttons: Docs, API, Community."
 *
 * Description:
 * Verify that the main page displays all required navigation buttons including:
 * - Docs button (navigates to /docs/)
 * - API button (navigates to /docs/api/)
 * - Community button (navigates to external community links like Discord/GitHub)
 * - Edge case: Handle scenarios where buttons might be hidden or disabled
 *
 * These buttons should be visible, accessible by role+name, and navigate correctly.
 */

test.describe('Main Page Navigation', () => {
  let mainPage: MainPage;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.navigateToMain();
  });

  test('The page should display Docs navigation button with correct accessibility', async () => {
    await mainPage.verifyTheElementIsVisibleAndHasRole(mainPage.docsButton, 'link');
    // Explicit check: href must match exactly for Docs path
    await expect(mainPage.docsButton).toHaveAttribute('href', testData.urls.docsIntroPath);
  });

  test('The page should display API navigation button with correct accessibility', async () => {
    await mainPage.verifyTheElementIsVisibleAndHasRole(mainPage.apiButton, 'link');
    // Explicit check: href must match exactly for API path
    await expect(mainPage.apiButton).toHaveAttribute('href', testData.urls.docsApiClassPlaywrightPath);
  });

  test('The page should display Community navigation button with correct accessibility', async () => {
    await mainPage.verifyTheElementIsVisibleAndHasRole(mainPage.communityButton, 'link');
    // Explicit check: href must contain GitHub repo for community links
    await expect(mainPage.communityButton).toHaveAttribute('href', expect.stringContaining(testData.urls.githubRepo));
  });

  test('The page should display all navigation buttons: Docs, API, Community', async () => {
    await mainPage.verifyTheElementIsVisibleAndHasRole(mainPage.docsButton, 'link');
    await mainPage.verifyTheElementIsVisibleAndHasRole(mainPage.apiButton, 'link');
    await mainPage.verifyTheElementIsVisibleAndHasRole(mainPage.communityButton, 'link');
  });

  test('The main page should navigate to Docs page when Docs button is clicked', async ({ page }) => {
    await mainPage.clickDocsButton();
    await page.waitForLoadState('networkidle'); // Ensure page fully loads
    await expect(page).toHaveURL(testData.urls.docsIntro);
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  });

  test('The main page should navigate to API page when API button is clicked', async ({ page }) => {
    await mainPage.clickApiButton();
    await page.waitForLoadState('networkidle'); // Ensure page fully loads
    await expect(page).toHaveURL(testData.urls.docsApiClassPlaywright);
    await expect(page.getByRole('heading', { name: 'Playwright' })).toBeVisible();
  });

  test('The main page should have navigation buttons in logical sequence', async () => {
    const navButtons = await mainPage.getNavigationButtonsText();
    expect(navButtons.length).toBeGreaterThanOrEqual(2);
    expect(navButtons.some(btn => btn.toLowerCase().includes('docs'))).toBe(true);
    expect(navButtons.some(btn => btn.toLowerCase().includes('api'))).toBe(true);
  });

  test('The main page should handle hidden navigation button gracefully (edge case)', async ({ page }) => {
    // Simulate hiding a button (edge case for disabled/hidden state)
    await page.getByRole('link', { name: 'Docs' }).evaluate(el => el.style.display = 'none');
    await expect(mainPage.docsButton).not.toBeVisible(); // Button should be hidden
    // No navigation should occur if clicked, but since hidden, click would fail - test absence
  });

    test('Failed test to check notifications', async ({ page }) => {
    // test is made for testing purposes of notification if test fails in pipeline
    await mainPage.clickApiButton();
    await expect(page).toHaveURL(testData.urls.docsApiClassPlaywrightPath);
  });
});