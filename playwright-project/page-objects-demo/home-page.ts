import {expect , type Locator, type Page} from '@playwright/test';

export class HomePage {
    readonly page : Page;
    readonly pageTilte : string;
    readonly singUpButton :Locator;
    readonly urlEndPoint : string = '/addUser';

    constructor(page:Page){
    this.page = page;
    this.pageTilte = ('Contact List App');
    this.singUpButton = page.locator('button[id="signup"]');
}
    // Validate the home page title
    async validateHomePageTitle(){
        await expect(this.page).toHaveTitle(this.pageTilte);
    }
    // Click the Sign Up button
    async clickSignUpButton(){
        await expect (this.singUpButton).toBeVisible();
        await expect (this.singUpButton).toBeEnabled();
        await this.singUpButton.click();
    }

    // Ensure the user is on the Sign Up page
    async ensureOnSignUpPage(){
        await this.page.waitForURL(new RegExp(`${this.urlEndPoint}$`), { timeout: 5000 });
        await expect(this.page).toHaveURL(new RegExp(`${this.urlEndPoint}$`));
    }

    // Main method to validate home page and navigate to Sign Up
    async navigateToSignUpPage(){
        await this.validateHomePageTitle();
        await this.clickSignUpButton();
        await this.ensureOnSignUpPage();
    }
}

