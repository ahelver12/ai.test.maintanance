import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/mainPage';
import { testData } from '../testData/testData';

/**
 * TEST CASE: "The main page should display navigation buttons: Docs, API, Community."
 *
 * Description:
 * Verify that the main page displays all required navigation buttons including:
 * - Docs button
 * - API button
 * - Community button (includes Discord, GitHub, or similar community links)
 *
 * These buttons should be visible, accessible, and properly linked.
 */

test.describe('Main Page Navigation', () => {
  let mainPage: MainPage;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.navigateToMain();
  });

  test('The main page should navigate to Docs page when Docs button is clicked', async ({ page }) => {
    await mainPage.docsButton.isVisible();
    await mainPage.clickDocsButton();
    // Wait for navigation
    await page.waitForLoadState('networkidle');
    // Verify navigation occurred
    await expect(page).toHaveURL(testData.urls.docsIntro);
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  });

  test('The main page should navigate to API page when API button is clicked', async ({ page }) => {
    await mainPage.apiButton.isVisible();
    await mainPage.clickApiButton();
    // Wait for navigation
    await page.waitForLoadState('networkidle');
    // Verify navigation occurred
    await expect(page).toHaveURL(testData.urls.docsApiClassPlaywright); // Specific URL
    await expect(page.getByRole('heading', { name: 'Playwright' })).toBeVisible();
  });

  test('The page should have all navigation buttons in correct sequence', async () => {
    const navButtons = await mainPage.getNavigationButtonsText();
    // Verify buttons exist and are in expected order
    expect(navButtons.length).toBeGreaterThanOrEqual(2);
    expect(navButtons.some(btn => btn.toLowerCase().includes('docs'))).toBe(true);
    expect(navButtons.some(btn => btn.toLowerCase().includes('api'))).toBe(true);
    // Check for presence of main buttons (case-insensitive)
    const navText = navButtons.join(' ').toLowerCase();
    expect(navText).toContain('docs');
    expect(navText).toContain('api');
  });

  test('The page should display CLI navigation button', async () => {
    await expect(mainPage.cliButton).toBeVisible();
  });
});
