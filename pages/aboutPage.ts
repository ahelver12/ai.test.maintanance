import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

/**
 * About Page Object Model
 * Represents an about page example
 */
export class AboutPage extends BasePage {
  readonly aboutHeading: Locator;
  readonly aboutContent: Locator;
  readonly backLink: Locator;

  constructor(page: Page) {
    super(page);
    this.aboutHeading = page.getByRole('heading', { name: /Playwright enables reliable web automation/i });
    this.aboutContent = page.getByText(/One API to drive Chromium, Firefox, and WebKit/i);
    this.backLink = page.getByRole('link', { name: /Playwright logo/i });
  }

  /**
   * Navigate to the Playwright main page
   */
  async navigateToAbout(): Promise<void> {
    await this.goto('https://playwright.dev/');
  }

  /**
   * Get about page heading
   */
  async getAboutHeadingText(): Promise<string> {
    await this.waitForElement(this.aboutHeading);
    return await this.getText(this.aboutHeading);
  }

  /**
   * Verify page contains content
   */
  async verifyPageContent(): Promise<boolean> {
    await this.waitForElement(this.aboutContent);
    return await this.aboutContent.isVisible();
  }

  /**
   * Verify page title
   */
  async verifyPageTitle(): Promise<string> {
    return await this.getTitle();
  }

  /**
   * Navigate back to home
   */
  async navigateBack(): Promise<void> {
    if (await this.backLink.isVisible()) {
      await this.click(this.backLink);
    }
  }

  /**
   * Get page URL
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }
}
