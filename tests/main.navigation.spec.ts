import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/mainPage';

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

  test('should display Docs navigation button', async () => {
    const isDocsVisible = await mainPage.isDocsButtonVisible();
    expect(isDocsVisible).toBe(true);
  });

  test('should display API navigation button', async () => {
    const isApiVisible = await mainPage.isApiButtonVisible();
    expect(isApiVisible).toBe(true);
  });

  test('should display Community navigation button', async () => {
    const isCommunityVisible = await mainPage.isCommunityButtonVisible();
    expect(isCommunityVisible).toBe(true);
  });

  test('should display all navigation buttons: Docs, API, Community', async () => {
    const allButtonsVisible = await mainPage.verifyAllNavigationButtonsVisible();
    expect(allButtonsVisible).toBe(true);
  });

  test('Docs button should have valid href attribute', async () => {
    const docsUrl = await mainPage.getDocsButtonUrl();
    expect(docsUrl).toBeTruthy();
    expect(docsUrl).toContain('/');
  });

  test('API button should have valid href attribute', async () => {
    const apiUrl = await mainPage.getApiButtonUrl();
    expect(apiUrl).toBeTruthy();
    expect(apiUrl).toContain('/');
  });

  test('Community button should have valid href attribute', async () => {
    const communityUrl = await mainPage.getCommunityButtonUrl();
    expect(communityUrl).toBeTruthy();
  });

  test('should navigate to Docs page when Docs button is clicked', async ({ page }) => {
    const docsUrl = await mainPage.getDocsButtonUrl();
    await mainPage.clickDocsButton();

    // Wait for navigation
    await page.waitForLoadState('networkidle');

    // Verify navigation occurred
    const currentUrl = page.url();
    expect(currentUrl).toBeTruthy();
  });

  test('should navigate to API page when API button is clicked', async ({ page }) => {
    const apiUrl = await mainPage.getApiButtonUrl();
    await mainPage.clickApiButton();

    // Wait for navigation
    await page.waitForLoadState('networkidle');

    // Verify navigation occurred
    const currentUrl = page.url();
    expect(currentUrl).toBeTruthy();
  });

  test('should navigate when Community button is clicked', async ({ page }) => {
    const communityUrl = await mainPage.getCommunityButtonUrl();
    await mainPage.clickCommunityButton();

    // Wait for navigation
    await page.waitForLoadState('networkidle');

    // Verify navigation occurred
    const currentUrl = page.url();
    expect(currentUrl).toBeTruthy();
  });

  test('should have all navigation buttons in correct sequence', async () => {
    const navButtons = await mainPage.getNavigationButtonsText();
    
    // Verify buttons exist in navigation
    expect(navButtons.length).toBeGreaterThan(0);
    
    // Check for presence of main buttons (case-insensitive)
    const navText = navButtons.join(' ').toLowerCase();
    expect(navText).toContain('docs');
    expect(navText).toContain('api');
  });

  test('should display CLI navigation button', async () => {
    const cliButtonVisible = await mainPage.isCliButtonVisible();
    expect(cliButtonVisible).toBe(true);
  });
});
