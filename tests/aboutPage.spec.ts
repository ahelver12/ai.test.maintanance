import { test, expect } from '@playwright/test';
import { AboutPage } from '../pages/aboutPage';

/**
 * About Page Tests
 * Test suite for the about page using Page Object Model
 */
test.describe('About Page Tests', () => {
  let aboutPage: AboutPage;

  test.beforeEach(async ({ page }) => {
    aboutPage = new AboutPage(page);
  });

  test('should navigate to the Playwright main page via URL', async () => {
    await aboutPage.navigateToAbout();
    const currentUrl = await aboutPage.getCurrentUrl();
    expect(currentUrl).toContain('playwright.dev');
  });

  test('should verify page content is displayed', async () => {
    await aboutPage.navigateToAbout();
    const contentVisible = await aboutPage.verifyPageContent();
    expect(contentVisible).toBe(true);
  });

  test('should verify page title after navigation', async () => {
    await aboutPage.navigateToAbout();
    const title = await aboutPage.verifyPageTitle();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(0);
  });
});
