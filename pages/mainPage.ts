import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

/**
 * Main Navigation Page Object Model
 * Represents the main page with navigation elements
 */
export class MainPage extends BasePage {
  readonly docsButton: Locator;
  readonly apiButton: Locator;
  readonly communityButton: Locator;
  readonly cliButton: Locator;
  readonly navContainer: Locator;

  constructor(page: Page) {
    super(page);
    // Locators for navigation buttons
    this.docsButton = page.getByRole('link', { name: /docs/i });
    this.apiButton = page.getByRole('link', { name: /api/i });
    this.communityButton = page.getByRole('link', { name: /community|discord|github/i });
    this.cliButton = page.getByRole('link', { name: /cli/i });
    this.navContainer = page.locator('nav, [role="navigation"]');
  }

  /**
   * Navigate to main page
   */
  async navigateToMain(): Promise<void> {
    await this.goto('https://playwright.dev/');
  }

  /**
   * Check if Docs button is visible
   */
  async isDocsButtonVisible(): Promise<boolean> {
    return await this.docsButton.first().isVisible();
  }

  /**
   * Check if API button is visible
   */
  async isApiButtonVisible(): Promise<boolean> {
    return await this.apiButton.isVisible();
  }

  /**
   * Check if Community button is visible
   */
  async isCommunityButtonVisible(): Promise<boolean> {
    return await this.communityButton.first().isVisible();
  }

  /**
   * Check if Docs button is visible
   */
  async isCliButtonVisible(): Promise<boolean> {
    return await this.cliButton.first().isVisible();
  }

  /**
   * Get all navigation buttons text
   */
  async getNavigationButtonsText(): Promise<string[]> {
    const buttons = await this.navContainer.locator('a').allTextContents();
    return buttons;
  }

  /**
   * Click on Docs button
   */
  async clickDocsButton(): Promise<void> {
    await this.click(this.docsButton.first());
  }

  /**
   * Click on API button
   */
  async clickApiButton(): Promise<void> {
    await this.click(this.apiButton.first());
  }

  /**
   * Click on Community button
   */
  async clickCommunityButton(): Promise<void> {
    await this.click(this.communityButton.first());
  }

  /**
   * Verify all main navigation buttons are visible
   */
  async verifyAllNavigationButtonsVisible(): Promise<boolean> {
    const docsVisible = await this.isDocsButtonVisible();
    const apiVisible = await this.isApiButtonVisible();
    const communityVisible = await this.isCommunityButtonVisible();

    return docsVisible && apiVisible && communityVisible;
  }

  /**
   * Get Docs button URL
   */
  async getDocsButtonUrl(): Promise<string | null> {
    return await this.getAttribute(this.docsButton.first(), 'href');
  }

  /**
   * Get API button URL
   */
  async getApiButtonUrl(): Promise<string | null> {
    return await this.getAttribute(this.apiButton, 'href');
  }

  /**
   * Get Community button URL
   */
  async getCommunityButtonUrl(): Promise<string | null> {
    return await this.getAttribute(this.communityButton.first(), 'href');
  }
}
