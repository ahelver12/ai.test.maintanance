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
    // Locators for navigation buttons - using precise role and name selectors
    this.docsButton = page.getByRole('link', { name: 'Docs' });
    this.apiButton = page.getByRole('link', { name: 'API' });
    this.communityButton = page.getByRole('link', { name: 'GitHub repository' }); // Specific community link
    this.cliButton = page.locator("//a[text()='CLI']"); // Assuming CLI is a link with text 'CLI'
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
    return await this.docsButton.isVisible();
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
    return await this.communityButton.isVisible();
  }

  /**
   * Check if CLI button is visible
   */
  async isCliButtonVisible(): Promise<boolean> {
    return await this.cliButton.isVisible();
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
    await this.click(this.docsButton);
    await this.page.waitForTimeout(3000); // Wait for navigation to complete
  }

  /**
   * Click on API button
   */
  async clickApiButton(): Promise<void> {
    await this.click(this.apiButton);
    await this.page.waitForTimeout(3000); 
  }

  /**
   * Click on Community button
   */
  async clickCommunityButton(): Promise<void> {
    await this.click(this.communityButton);
    await this.page.waitForTimeout(3000); 
    
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
    return await this.getAttribute(this.docsButton, 'href');
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
    return await this.getAttribute(this.communityButton, 'href');
  }
}
