import { Page, expect } from '@playwright/test';
import type { User } from "../env.config"
import { environmentData } from "../../fixtures/environments/brands"

const users: User[] = environmentData['production'].users;

let depositorEmail = users.find(user => user.role === 'depositor')?.email;
let depositorPassword = users.find(user =>  user.role === 'depositor')?.password;

// Helper: Click the "Log in" button and ensure the login modal is visible
const logInButton = async (page: Page) => {
    await page.getByRole('button', { name: 'Log in' }).waitFor({ state: 'visible' });
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.locator('.modal-authentication > .modal__dialog > .modal__content').waitFor({ state: 'visible' });
}

// Helper: Fill in login credentials
const logInCredentials = async (page: Page, itsInvalidPassword = false) => {
    const email = depositorEmail;
    const password = itsInvalidPassword ? '1234' : depositorPassword;
    if (!email) throw new Error('Depositor email not found in users array');
    if (!password) throw new Error('Depositor password not found in users array');
    const flexGrow = page.locator('.flex-grow');
    await flexGrow.waitFor({ state: 'visible' });
    await flexGrow.locator('#emailLogin').fill(email);
    await flexGrow.locator('#passwordLogin').fill(password);
    // Intercept login API call for assertion
    const [response] = await Promise.all([
        page.waitForResponse(resp => resp.url().includes('/livewire/update') && [200, 302].includes(resp.status()), { timeout: 7000 }),
        flexGrow.getByRole('button', { name: 'Log in' }).click()
    ]);
    expect([200, 302]).toContain(response.status());
}

// Main logIn command
const logIn = async (page: Page, logInType: string): Promise<void> => {
    switch (logInType) {
        case 'areInvalidCredentials':
            await logInButton(page);
            await logInCredentials(page, true);
            // Capture and save error message for invalid credentials
            const errorMessage = (await page.locator('.gap-y-2').innerText()).replace(/\s+/g, ' ').trim();
            console.log(`Credentials are wrong:  ${errorMessage}`);
            // Optionally write to file if needed
            // await fs.promises.writeFile('cypress/fixtures/emtpyFieldsMessageWrongPassword.json', JSON.stringify({ message: errorMessage }));
            break;
        case 'areCorrectCredentials':
            await logInButton(page);
            await logInCredentials(page);
            break;
    }
}

// logOut command
const logOut = async (page: Page) => {
    await page.waitForTimeout(10000);
    await page.locator('.header__user-avatar').waitFor({ state: 'visible' });
    await page.locator('.header__user-avatar').click();
    await page.getByRole('menuitem', { name: /Log out/i }).click();
    // Playwright does not have cy.clearCookies, but you can clear cookies if needed:
    await page.context().clearCookies();
    await page.waitForTimeout(10000);
    // Ensure the URL does not include the deposit page
    expect(page.url()).not.toMatch(/deposit/i);
    await page.context().clearCookies();
}

export { logIn, logOut };