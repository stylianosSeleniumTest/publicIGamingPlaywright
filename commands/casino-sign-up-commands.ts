import { Page, expect } from '@playwright/test';
import { customerDetails } from './utils';
import { promises as fs } from 'fs';

// Helper: Converts month name to number for DOB select
const monthNameToNumber = {
    January: '1', February: '2', March: '3', April: '4', May: '5', June: '6',
    July: '7', August: '8', September: '9', October: '10', November: '11', December: '12',
};

// Helper: Click the "Sign up" button and ensure the modal is visible
const singUpButton = async (page: Page) => {
    await page.getByRole('button', { name: 'Sign up' }).waitFor({ state: 'visible' });
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.locator('.modal-authentication > .modal__dialog > .modal__content').waitFor({ state: 'visible' });
};

// Step 1: Fill in email and password fields for new customer
// - If shouldFillAllData, use valid data and save to file
// - If shouldProvideInvalidData, use invalid data
// - Otherwise, just check placeholders
const newCustomerDataStep1 = async (page: Page, shouldFillAllData = false, shouldProvideInvalidData = false) => {
    const customerData = customerDetails();
    const flexGrow = page.locator('.flex-grow');
    await flexGrow.waitFor({ state: 'visible' });
    await flexGrow.getByText('Step 1/2');
    await flexGrow.getByText('Create an account');
    await flexGrow.getByText('Sign up and start playing in less than 60 seconds.');
    await flexGrow.getByText('I am over 18 years old and I accept the Terms and conditions and privacy policy');
    await flexGrow.locator('select[id="form.country_id"]').selectOption({ label: 'Cyprus' });

    if (shouldFillAllData) {
        // Fill valid email and password, save to file
        await flexGrow.locator('#emailSignup').fill(customerData.email);
        await fs.writeFile('playwright-project/fixtures/randomEmail.json', JSON.stringify({ userEmail: customerData.email }));
        await flexGrow.locator('#passwordSignup').fill(customerData.password);
        await fs.writeFile('playwright-project/fixtures/randomPassword.json', JSON.stringify({ userPassword: customerData.password }));
    } else if (shouldProvideInvalidData) {
        // Fill invalid email and password
        await flexGrow.locator('#emailSignup').fill('invalidemail');
        await flexGrow.locator('#passwordSignup').fill('1234');
    } else {
        // Check placeholders only
        await expect(flexGrow.locator('#passwordSignup')).toBeVisible();
        await expect(flexGrow.locator('#passwordSignup')).toHaveAttribute('placeholder', 'Enter your password');
        await expect(flexGrow.locator('#emailSignup')).toBeVisible();
        await expect(flexGrow.locator('#emailSignup')).toHaveAttribute('placeholder', 'john.doe@example.com');
    }
    await flexGrow.getByRole('button', { name: 'Continue' }).click();
};

// Step 2: Fill in personal details for new customer
// - If shouldFillAllData, use valid data and save to file
// - If shouldProvideInvalidData, use invalid names
// - Otherwise, just check placeholders
const newCustomerDataStep2 = async (page: Page, shouldFillAllData = false, shouldProvideInvalidData = false) => {
    const customerData = customerDetails();
    const monthName = customerData.monthOfBirth;
    const monthValue = monthNameToNumber[monthName];
    const flexGrow = page.locator('.flex-grow');
    await flexGrow.waitFor({ state: 'visible' });
    await flexGrow.getByText('Step 2/2');
    await flexGrow.getByText('Create an account');
    await flexGrow.getByText('Sign up and start playing in less than 60 seconds.');
    await flexGrow.getByText('I am over 18 years old and I accept the Terms and conditions and privacy policy');

    if (shouldFillAllData) {
        // Fill valid personal details, save to file
        await flexGrow.locator('input[label="First name"]').fill(customerData.firstName);
        await fs.writeFile('playwright-project/fixtures/randomfirstName.json', JSON.stringify({ userFirstName: customerData.firstName }));
        await flexGrow.locator('input[label="Last name"]').fill(customerData.lastName);
        await fs.writeFile('playwright-project/fixtures/randomlastName.json', JSON.stringify({ userLastName: customerData.lastName }));
        await flexGrow.locator('input[label="Phone"]').fill(`99${customerData.phoneNumber}`);
        await fs.writeFile('playwright-project/fixtures/randomPhone.json', JSON.stringify({ userPhone: customerData.phoneNumber }));
        await flexGrow.locator('input[label="Postal code"]').fill(customerData.postalCode);
        await flexGrow.locator('select[id="dob.day"]').selectOption(customerData.dayOfBirth);
        await flexGrow.locator('select[id="dob.month"]').selectOption(customerData.monthOfBirth);
        await flexGrow.locator('select[id="dob.year"]').selectOption(customerData.yearOfBirth);
        // Intercept registration API call
        const [response] = await Promise.all([
            page.waitForResponse(resp => resp.url().includes('/livewire/update') && [200, 302].includes(resp.status()), { timeout: 7000 }),
            flexGrow.getByRole('button', { name: 'Register' }).click()
        ]);
        expect([200, 302]).toContain(response.status());
    } else if (shouldProvideInvalidData) {
        // Fill invalid names
        await flexGrow.locator('input[label="First name"]').fill('****90');
        await flexGrow.locator('input[label="Last name"]').fill('907906{}');
        await flexGrow.locator('input[label="Phone"]').fill(`99${customerData.phoneNumber}`);
        await flexGrow.locator('input[label="Postal code"]').fill(customerData.postalCode);
        await flexGrow.locator('select[id="dob.day"]').selectOption(customerData.dayOfBirth);
        await flexGrow.locator('select[id="dob.month"]').selectOption(customerData.monthOfBirth);
        await flexGrow.locator('select[id="dob.year"]').selectOption(customerData.yearOfBirth);
        await flexGrow.getByRole('button', { name: 'Register' }).click();
    } else {
        // Check placeholders only
        await expect(flexGrow.locator('input[label="First name"]')).toHaveAttribute('placeholder', 'John');
        await expect(flexGrow.locator('input[label="Last name"]')).toHaveAttribute('placeholder', 'Doe');
        await expect(flexGrow.locator('input[label="Postal code"]')).toHaveAttribute('placeholder', '1070');
        await expect(flexGrow.locator('select[id="dob.day"]')).toHaveValue('');
        await expect(flexGrow.locator('select[id="dob.month"]')).toHaveValue('');
        await expect(flexGrow.locator('select[id="dob.year"]')).toHaveValue('');
        await flexGrow.getByRole('button', { name: 'Register' }).click();
    }
};

// Main signUpForm command
// Accepts a dataType string to determine which scenario to run
// Saves error messages to file for each scenario
const signUpForm = async (page: Page, dataType: string): Promise<void> => {
    switch (dataType) {
        case "areEmptyData":
            await singUpButton(page);
            await newCustomerDataStep1(page);
            await newCustomerDataStep2(page);
            // Capture and save error message for empty fields
            const errorMessageEmpty = (await page.locator('.gap-y-2').innerText()).replace(/\s+/g, ' ').trim();
            console.log(`Please fill the Sign Up Form with correct Data:  ${errorMessageEmpty}`);
            await fs.writeFile('playwright-project/fixtures/emtpyFieldsMessageAllEmpty.json', JSON.stringify({ message: errorMessageEmpty }));
            break;
        case "areAllFilled":
            await singUpButton(page);
            await newCustomerDataStep1(page, true);
            await newCustomerDataStep2(page, true);
            // If error message exists, save it
            if (await page.locator('.gap-y-2').count() > 0) {
                const errorMessage = (await page.locator('.gap-y-2').innerText()).replace(/\s+/g, ' ').trim();
                console.log(`Please fill the Sign Up Form with correct Data:  ${errorMessage}`);
                await fs.writeFile('playwright-project/fixtures/emtpyFieldsMessage.json', JSON.stringify({ message: errorMessage }));
            }
            break;
        case "isInvalidPasswordAndEmail":
            await singUpButton(page);
            await newCustomerDataStep1(page, false, true);
            await newCustomerDataStep2(page, true);
            // Capture and save error message for invalid email/password
            const errorMessageInvalid = (await page.locator('.gap-y-2').innerText()).replace(/\s+/g, ' ').trim();
            console.log(`Please fill the Sign Up Form with correct Data:  ${errorMessageInvalid}`);
            await fs.writeFile('playwright-project/fixtures/emtpyFieldsMessagePasswordEmail.json', JSON.stringify({ message: errorMessageInvalid }));
            break;
        case "isInvalidFirstNameLastName":
            await singUpButton(page);
            await newCustomerDataStep1(page, true);
            await newCustomerDataStep2(page, false, true);
            // Capture and save error message for invalid names
            const errorMessageName = (await page.locator('.gap-y-2').innerText()).replace(/\s+/g, ' ').trim();
            console.log(`Please fill the Sign Up Form with correct Data:  ${errorMessageName}`);
            await fs.writeFile('playwright-project/fixtures/emtpyFieldsMessageForInvalidNameLastName.json', JSON.stringify({ message: errorMessageName }));
            break;
    }
};

// Validates customer profile after registration
// Checks sidebar balance, profile tab, and user details
const validationOfCustomer = async (page: Page): Promise<void> => {
    await expect(page.locator('.sidebar__balance')).toBeVisible();
    await page.locator('.tab-user').getByText('Profile').click();
    await expect(page.locator('.grid > :nth-child(1) > .card__user')).toBeVisible();
    // Read and check saved email, phone, first name, last name
    const emailData = JSON.parse(await fs.readFile('playwright-project/fixtures/randomEmail.json', 'utf-8'));
    const phoneData = JSON.parse(await fs.readFile('playwright-project/fixtures/randomPhone.json', 'utf-8'));
    await expect(page.locator('.has-placeholder > .form-input')).toHaveValue(emailData.userEmail);
    await expect(page.locator('#user-profile-phone-number')).toHaveValue(`99${phoneData.userPhone}`);
    const firstNameData = JSON.parse(await fs.readFile('playwright-project/fixtures/randomfirstName.json', 'utf-8'));
    const lastNameData = JSON.parse(await fs.readFile('playwright-project/fixtures/randomlastName.json', 'utf-8'));
    await expect(page.locator('.header__user-avatar--name')).toContainText(`${firstNameData.userFirstName} ${lastNameData.userLastName}`);
};

export { signUpForm, validationOfCustomer };

