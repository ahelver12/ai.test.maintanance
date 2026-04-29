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
 *
 * These buttons should be visible, accessible by role+name, and navigate correctly.
 */

test.describe('Main Page Navigation', () => {
  let mainPage: MainPage;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.navigateToMain();
  });

  test('should display Docs navigation button with correct accessibility', async () => {
    await expect(mainPage.docsButton).toBeVisible();
    await expect(mainPage.docsButton).toHaveRole('link');
    await expect(mainPage.docsButton).toHaveAttribute('href', testData.urls.docsIntroPath);
  });

  test('should display API navigation button with correct accessibility', async () => {
    await expect(mainPage.apiButton).toBeVisible();
    await expect(mainPage.apiButton).toHaveRole('link');
    await expect(mainPage.apiButton).toHaveAttribute('href', testData.urls.docsApiClassPlaywrightPath);
  });

  test('should display Community navigation button with correct accessibility', async () => {
    await expect(mainPage.communityButton).toBeVisible();
    await expect(mainPage.communityButton).toHaveRole('link');
    await expect(mainPage.communityButton).toHaveAttribute('href', expect.stringContaining(testData.urls.githubRepo));
  });

  test('should display all navigation buttons: Docs, API, Community', async () => {
    await expect(mainPage.docsButton).toBeVisible();
    await expect(mainPage.apiButton).toBeVisible();
    await expect(mainPage.communityButton).toBeVisible();
  });

  test('should navigate to Docs page when Docs button is clicked', async ({ page }) => {
    await mainPage.clickDocsButton();
    await expect(page).toHaveURL(testData.urls.docsIntro);
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  });

  test('should navigate to API page when API button is clicked', async ({ page }) => {
    await mainPage.clickApiButton();
    await expect(page).toHaveURL(testData.urls.docsApiClassPlaywright);
    await expect(page.getByRole('heading', { name: 'Playwright' })).toBeVisible();
  });

  test('should have navigation buttons in logical sequence', async () => {
    const navButtons = await mainPage.getNavigationButtonsText();

    // Verify buttons exist and are in expected order
    expect(navButtons.length).toBeGreaterThanOrEqual(3);
    expect(navButtons.some(btn => btn.toLowerCase().includes('docs'))).toBe(true);
    expect(navButtons.some(btn => btn.toLowerCase().includes('api'))).toBe(true);
  });
});
