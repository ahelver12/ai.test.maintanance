import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

/**
 * Home Page Object Model
 * Represents the home page of Example.com
 */
export class HomePage extends BasePage {
  readonly heading: Locator;
  readonly paragraph: Locator;
  readonly moreInfoLink: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: /example domain/i });
    this.paragraph = page.locator('p').first();
    this.moreInfoLink = page.getByRole('link', { name: /more information/i });
  }

  /**
   * Navigate to home page
   */
  async navigateToHome(): Promise<void> {
    await this.goto('https://example.com');
  }

  /**
   * Verify page title
   */
  async verifyPageTitle(): Promise<string> {
    return await this.getTitle();
  }

  /**
   * Get heading text
   */
  async getHeadingText(): Promise<string> {
    await this.waitForElement(this.heading);
    return await this.getText(this.heading);
  }

  /**
   * Get paragraph text
   */
  async getParagraphText(): Promise<string> {
    await this.waitForElement(this.paragraph);
    return await this.getText(this.paragraph);
  }

  /**
   * Check if heading is visible
   */
  async isHeadingVisible(): Promise<boolean> {
    return await this.heading.isVisible();
  }
}
