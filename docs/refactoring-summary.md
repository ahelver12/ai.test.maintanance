Brief summary 

- The refactored file contains grouped tests improving readability
- Declared but not used variables are deleted
- More strong assertions are implemented
- The explicit assertion has been added to toHaveRole('link') method
- url is truthy check is changed to expect(page).toHaveURL(url) 




Manual fixes after the refactoring:
- Explicitly declared urls in tests are moved to a new file testData
- Urls are used from the testData file
- Fixed locator as it has violation to 2 elements 
- Logic fixes due to the failed tests after the refactoring as waiting is missed. Waiting is added to clickElement methods (not good approach so it is better to use it as a temporary quick fix)
- Incorrect check for the incorrect element is deleted which previously broke a test 