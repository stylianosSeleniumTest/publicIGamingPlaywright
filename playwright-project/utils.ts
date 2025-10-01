// It uses the Faker library to generate random user data for testing.

// Import faker library for generating random test data
import { faker } from '@faker-js/faker'
import { Page } from '@playwright/test';


//create a reusable command to visit casino
export const visitUrl = async (page: Page, url:string) => {
    await page.goto(url);
}

// Custom Command: Generate random customer details using Faker
export const customerDetails = () => {
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        phoneNumber: faker.number.int({ min: 100000, max: 999999 }).toString(),
        // Day of birth as two digits (e.g., 01, 02)
        dayOfBirth: faker.number.int({ min: 1, max: 30 }).toString().padStart(2, '0'),
        monthOfBirth: faker.date.month(),
        yearOfBirth: faker.number.int({ min: 1950, max: 2005 }).toString().padStart(2, '0'),
        postalCode: faker.number.int({ min: 1000, max: 9999 }).toString()
    }
}


