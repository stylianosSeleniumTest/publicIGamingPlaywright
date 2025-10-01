import {expect ,type Locator, type Page } from '@playwright/test';

// Page Object Model for the Login Page 
export class LogInPage {
    readonly page : Page;
    readonly logInBox : Locator; 
    readonly userNameInput: Locator; 
    readonly passwordInput: Locator; 
    readonly logInButton : Locator;  
    readonly urlEndPoint : string = '/inventory.html'

    // Define constructor, for selectors/locators
    constructor(page: Page)  {
        this.page = page;
        this.logInBox = page.locator('#login_button_container')
        this.userNameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('input[type="password"]');
        this.logInButton = page.locator('[data-test="login-button"]');   
    }

    // Wait for login box to be visible
    async validateLogInBox(){
        await this.logInBox.waitFor({ state: 'visible' });
    }
    // Fill username and check value
    async enterUserName(userName: string) {
        await this.userNameInput.fill(userName);
        await expect(this.userNameInput).toHaveValue(userName)
    }
    // Fill password and check value
    async enterPassword(password: string) {
        await this.passwordInput.fill(password);  
        await  expect(this.passwordInput).toHaveValue(password)
    }
    // Click login button
    async  clickToLogIn(){
        await expect(this.logInButton).toBeEnabled();
        await this.logInButton.click();
    } 
    // Validate successful login by URL
    async validateSuccessfulLogIn(){
        await this.page.waitForURL(new RegExp(`${this.urlEndPoint}$`), { timeout: 5000 });
        await expect(this.page).toHaveURL(new RegExp(`${this.urlEndPoint}$`));
    }
    // Main login method to run in test
    async  logInToApp(userName: string, password: string) {
        await this.validateLogInBox();
        await this.enterUserName(userName);
        await this.enterPassword(password);
        await this.clickToLogIn();
        await this.validateSuccessfulLogIn();
    }
}