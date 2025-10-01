import { type Page, } from "@playwright/test"
import { SignUpPage } from "../page-objects-demo/sign-up-page"
import { EnumSignUpScenarios } from "../enum-parameters"

/**
 * Helper function to run sign-up form scenarios.
 *
 * @param signUpScenario - The scenario identifier (from EnumSignUpScenarios) to determine which flow to test.
 */

export const signUpFormHelper = async (page: Page, signUpScenario: string) => {

    //create variable for the page class
    const signUpPage = new SignUpPage(page)

    switch (signUpScenario) {
        case EnumSignUpScenarios.invalidPassword:
            signUpPage.signUpForm(EnumSignUpScenarios.invalidPassword, /is shorter than the minimum allowed length (7)/)
            break;

        case EnumSignUpScenarios.emptyPassword:
            signUpPage.signUpForm(EnumSignUpScenarios.emptyPassword, /Path `password` is required./)
            break;

        default:
            signUpPage.signUpForm(EnumSignUpScenarios.default)
            break;
    }


}