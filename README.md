# Playwright POM Test Project

A modern Playwright test suite using the **Page Object Model (POM)** pattern with TypeScript.

## Project Structure

```
ai.test.maintanance/
├── pages/
│   ├── basePage.ts        # Base class for all pages with common methods
│   ├── homePage.ts        # Home page object
│   └── aboutPage.ts       # About page object
├── tests/
│   ├── homePage.spec.ts   # Home page test suite
│   └── aboutPage.spec.ts  # About page test suite
├── playwright.config.ts   # Playwright configuration (Chromium only)
├── package.json           # Project dependencies
├── tsconfig.json          # TypeScript configuration
├── tsconfig.spec.json     # TypeScript config for tests
├── .gitignore             # Git ignore rules
└── README.md              # This file
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Playwright browsers will be installed automatically on first test run.

## Configuration

- **Chromium Only**: Tests configured to run only on Chromium browser
- **Base URL**: https://example.com
- **Reporter**: HTML test report
- **Trace**: Enabled on first retry

## Test Suites

### 1. Home Page Tests (`tests/homePage.spec.ts`)
- Verify page title
- Display heading and paragraph text
- Verify heading visibility

### 2. About Page Tests (`tests/aboutPage.spec.ts`)
- Navigate to about page via URL
- Verify page content is displayed
- Verify page title after navigation

### 3. Main Navigation Tests (`tests/main.navigation.spec.ts`)
**Test Case:** "The main page should display navigation buttons: Docs, API, Community."

Tests include:
- Verify Docs navigation button is visible
- Verify API navigation button is visible
- Verify Community navigation button is visible
- Verify all navigation buttons are displayed together
- Validate href attributes for each button
- Verify clicking buttons navigates correctly
- Verify button sequence and content

## Page Objects

### BasePage (`pages/basePage.ts`)
Contains common methods:
- `goto(url)` - Navigate to URL
- `getTitle()` - Get page title
- `waitForElement(locator)` - Wait for element visibility
- `getText(locator)` - Get element text
- `click(locator)` - Click element
- `fill(locator, text)` - Fill input field
- `getAttribute(locator, attribute)` - Get element attribute

### HomePage (`pages/homePage.ts`)
Specific methods for home page:
- `navigateToHome()` - Go to home page
- `verifyPageTitle()` - Get and verify title
- `getHeadingText()` - Get heading text
- `getParagraphText()` - Get paragraph text
- `isHeadingVisible()` - Check heading visibility

### AboutPage (`pages/aboutPage.ts`)
Specific methods for about page:
- `navigateToAbout()` - Go to about page
- `getAboutHeadingText()` - Get about heading
- `verifyPageContent()` - Verify content visibility
- `navigateBack()` - Navigate back
- `getCurrentUrl()` - Get current URL

### MainPage (`pages/mainPage.ts`)
Specific methods for main navigation page:
- `navigateToMain()` - Go to main page
- `isDocsButtonVisible()` - Check Docs button visibility
- `isApiButtonVisible()` - Check API button visibility
- `isCommunityButtonVisible()` - Check Community button visibility
- `verifyAllNavigationButtonsVisible()` - Verify all buttons visible
- `clickDocsButton()` - Click Docs button
- `clickApiButton()` - Click API button
- `clickCommunityButton()` - Click Community button
- `getDocsButtonUrl()` - Get Docs button URL
- `getApiButtonUrl()` - Get API button URL
- `getCommunityButtonUrl()` - Get Community button URL
- `getNavigationButtonsText()` - Get all navigation button texts

## Running Tests

### Run all tests:
```bash
npm test
```

### Run tests in headed mode (see browser):
```bash
npm run test:headed
```

### Run tests in debug mode:
```bash
npm run test:debug
```

### Run tests in UI mode:
```bash
npm run test:ui
```

### Run specific test file:
```bash
npx playwright test tests/homePage.spec.ts
```

### Run tests with specific tag:
```bash
npx playwright test --grep @tagname
```

## Reports

HTML test report is generated after test run:
```bash
npx playwright show-report
```

## Debugging

Use Playwright Inspector for debugging:
```bash
npx playwright test --debug
```

Or use trace viewer:
```bash
npx playwright show-trace trace.zip
```

## Dependencies

- `@playwright/test`: ^1.46.1 - Playwright testing framework
- `typescript`: ^5.3.3 - TypeScript language
- `@types/node`: ^20.11.0 - Node.js type definitions

## Browser Support

Currently configured for **Chromium only**. To add Firefox or WebKit:
1. Update `playwright.config.ts` projects array
2. Add additional device configurations in the `use` object

## Best Practices Implemented

✅ Page Object Model pattern for maintainability  
✅ TypeScript for type safety  
✅ Separation of concerns (pages vs tests)  
✅ Reusable base class with common methods  
✅ Descriptive test names  
✅ HTML reporting  
✅ .gitignore for dependencies and results  
✅ Configuration for single browser (Chromium)  

## License

MIT
