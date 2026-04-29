Prioritized checklist

1. Fix navigation target verification:
    Assert exact expected href or expected URL after click for Docs/API/Community.
2. Harden the Community locator:
    Use a specific accessible name or more precise selector.
3. Add explicit accessibility assertions:
    Confirm each button is a role=link with the expected name.
4. Replace waitForLoadState('networkidle') with state-based waits:
    Wait on a specific page element, breadcrumb, or expected URL.
5. Improve href coverage:
    Verify actual destination values, not just “contains /”.
6. Align sequence test with manual case:
    Include Community and check actual order if required.
7. Remove unrelated navigation tests or separate them into their own suite.


###
Broad locator -> maintance overhead, flaky waits -> failures, unused data -> code noise, inconsistent locators -> maintenance debt 