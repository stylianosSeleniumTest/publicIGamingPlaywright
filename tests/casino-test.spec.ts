import { test, expect } from '@playwright/test';
import { visitCasino } from '../commands/utils';
import { logIn, logOut } from '../commands/casino-log-in-commands';
import { signUpForm } from '../commands/casino-sign-up-commands';

//import enum for type safety
import { SignUpFormState, LogInFromState } from '../commands/enum-safety-type-parameters';

//import env mapping and types
import { EnvironmentConfig, EnvironmentName } from '../env.config';
import { environmentData } from '../../fixtures/environments/brands'

//set env to use
const env: EnvironmentName = 'production'
//set all brands to use
const brands = environmentData[env].brands as EnvironmentConfig['brands'];

test.describe('Test Example Casino', () => {
  //loop all brands
  brands.forEach((brand) => {
    test('Validation State for Sign-Up Fields(Empty Fields)', async ({ page }) => {
      await visitCasino(page, brand.url)
      await signUpForm(page, SignUpFormState.AreEmptyData)
    })
    test('Validation State for Sign-Up Fields(Invalid Fields in Step 1)', async ({ page }) => {
      await visitCasino(page, brand.url)
      await signUpForm(page, SignUpFormState.IsInvalidPasswordAndEmail)
    })

    test('Validation State for Sign-Up Fields(Invalid Fields in Step 2)', async ({ page }) => {
      await visitCasino(page, brand.url)
      await signUpForm(page, SignUpFormState.IsInvalidFirstNameLastName)
    })

    test('Validation State for Sign-Up Fields(Fill ALL Fields)', async ({ page }) => {
      await visitCasino(page, brand.url)
      await signUpForm(page, SignUpFormState.AreAllFilled)
      await expect(page.url()).toMatch(/deposit/i) // Adjust the URL check to confirm lan ding on the deposit page after successful sign-up
    })

    test('Log In To Account - Valid Password )', async ({ page }) => {
      await visitCasino(page, brand.url)
      await logIn(page, LogInFromState.AreCorrectCredentials)
      await logOut(page)
    })

    test('Log In To Account - Invalid Password)', async ({ page }) => {
      await visitCasino(page, brand.url)
      await logIn(page, LogInFromState.AreInvalidCredentials)
    })

  })
})