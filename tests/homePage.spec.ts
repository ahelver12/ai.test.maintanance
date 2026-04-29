import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';

/**
 * Home Page Tests
 * Test suite for the home page using Page Object Model
 */
test.describe('Home Page Tests', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHome();
  });

  test('should load home page and verify title', async () => {
    const title = await homePage.verifyPageTitle();
    expect(title).toBe('Example Domain');
  });

  test('should display heading and paragraph text', async () => {
    const headingText = await homePage.getHeadingText();
    const paragraphText = await homePage.getParagraphText();

    expect(headingText).toContain('Example Domain');
    expect(paragraphText).toBeTruthy();
  });

  test('should verify heading is visible', async () => {
    const isVisible = await homePage.isHeadingVisible();
    expect(isVisible).toBe(true);
  });
});
