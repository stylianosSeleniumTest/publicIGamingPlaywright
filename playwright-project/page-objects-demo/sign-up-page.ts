import { expect, type Locator, type Page } from '@playwright/test';
//import the faker dynamic data
import { customerDetails } from '../utils';
import { EnumSignUpScenarios } from '../enum-parameters';

export class SignUpPage {
    readonly page: Page;
    readonly pageTitle: string;
    readonly form: Locator;
    readonly userNameInput: Locator
    readonly userLastNameInput: Locator
    readonly emailInput: Locator;
    readonly passwordInput: Locator
    readonly confirmButton: Locator;
    readonly error: Locator;
    readonly urlEndPoint: string

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = 'Add User';
        this.form = page.locator('form[id="add-user"]')
        this.userNameInput = this.form.locator('input[id="firstName"]')
        this.userLastNameInput = this.form.locator('input[id="lastName"]')
        this.emailInput = this.form.locator('input[id="email"]')
        this.passwordInput = this.form.locator('input[id="password"]')
        this.confirmButton = this.form.locator('button[id="submit"]')
        this.urlEndPoint = '/contactList'
        this.error = page.locator('[id="error"]')
    }

    //validate the page title
    async validatePageTitle() {
        await expect(this.page).toHaveTitle(this.pageTitle)
    }

    //validate if the form is visible
    async validateForm() {
        await expect(this.form).toBeVisible()
    }

    //fill the form with dynamic data from faker.utils
    async fillTheForm(signUpScenario: string, errorMessage?: RegExp) {
        const customerData = customerDetails()

        await this.userLastNameInput.fill(customerData.firstName)
        await expect(this.userLastNameInput).toHaveValue(customerData.firstName)

        await this.userLastNameInput.fill(customerData.lastName)
        await expect(this.userLastNameInput).toHaveValue(customerData.lastName)

        await this.emailInput.fill(customerData.email)
        await expect(this.emailInput).toHaveValue(customerData.email)


        //switch from helper will apply here for - password scenarios

        //if password case will be invalid
        if (signUpScenario === EnumSignUpScenarios.invalidPassword) {
            await this.passwordInput.fill('1234')
            //ensure the error message applied
            if (!errorMessage) {
                throw new Error('No Error Message Provided')
            }
            //ensure the expected error message
            await expect(this.error).toContainText(errorMessage)
        }

        //if password case will be empty
        else if (signUpScenario === EnumSignUpScenarios.emptyPassword) {
            await expect(this.passwordInput).toBeEmpty()
            //ensure the error message applied
            if (!errorMessage) {
                throw new Error('No Error Message Provided')
            }
            //ensure the expected error message
            await expect(this.error).toContainText(errorMessage)
        }

        else {
            //default - is to fill correct password
            console.log('Default Scenario - Correct Password')
            await this.passwordInput.fill(customerData.password)
            await expect(this.passwordInput).toHaveValue(customerData.password)
        }
    }

    //confirm 
    async confirmation() {
        await expect(this.confirmButton).toBeVisible()
        await expect(this.confirmButton).toBeEnabled()
        await this.page.waitForURL(new RegExp(`${this.urlEndPoint}$`), { timeout: 5000 });
        await expect(this.page).toHaveURL(new RegExp(`${this.urlEndPoint}$`));
    }

    /**
 * Main function for signing up a user.
 *
 * @param scenario - The test scenario identifier (e.g., "empty", "invalidEmail").
 * @param errorMessage - Optional regular expression to validate an expected error message.
 */
    async signUpForm(scenario: string, errorMessage?: RegExp) {
        await this.validatePageTitle()
        await this.validateForm()
        await this.fillTheForm(scenario, errorMessage)
        await this.confirmation()
    }
}
