// Import Playwright test runner
import { test } from '@playwright/test';
// Import utility to visit URLs
import { visitUrl } from '../utils';
// Import custom hook for environment and brand selection
import { useBrandEnvHook } from '../hooks'
// Import enums for environment and brand types
import { EnumEnvironmentTypes, EnumBrandsTypes } from '../enum-parameters';

// Import helper for sign-up form actions
import { signUpFormHelper } from '../demo-helper/sign-up-form-helper';
// Import enum for sign-up scenarios
import { EnumSignUpScenarios } from '../enum-parameters'



//use the reusable env hook to get the correct enum type env and brand
const { currentUrl } = useBrandEnvHook(EnumEnvironmentTypes.production, EnumBrandsTypes.thinking);

// Group related sign-up tests
test.describe('Multiple Sign-Up Scenarios', () => {
    test.beforeEach(async ({ page }) => {
        // Confirm demo url exists before each test
        if (!currentUrl) {
            throw new Error('Demo URL not found in brands array');
        }
        //visit the URL
        await visitUrl(page, currentUrl)
    })

    test('Sign Up with Correct Data', async ({ page }) => {
        // Test sign up with valid data
        await signUpFormHelper(page, EnumSignUpScenarios.default)
    })
    test('Sing Up with Invalid Password', async ({ page }) => {
        // Test sign up with invalid password
        await signUpFormHelper(page, EnumSignUpScenarios.invalidPassword)
    })
    test('Sign Up with Empty Password', async ({ page }) => {
        // Test sign up with empty password
        await signUpFormHelper(page,EnumSignUpScenarios.emptyPassword)
    })


})