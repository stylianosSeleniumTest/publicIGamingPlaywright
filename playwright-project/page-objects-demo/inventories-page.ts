import { type Page, type Locator, expect } from "@playwright/test";
// Only for backpack item - can be extended for more items later

export class InventoriesPage {
    readonly page: Page;
    readonly backpackItem: Locator; // Backpack item container
    readonly backpackName: Locator; // Backpack name
    readonly priceBar: Locator;     // Price bar section
    readonly addToCartButton: Locator; // Add to cart button
    readonly removeButton: Locator;    // Remove button

    constructor(page: Page) {
        this.page = page;
        // Locate the backpack item by name
        this.backpackItem = page.locator('[data-test="inventory-item"]').filter({ has: page.locator('[data-test="inventory-item-name"]', { hasText: /Sauce Labs Backpack/ }) });
        this.backpackName = this.backpackItem.locator('[data-test="inventory-item-name"]');
        this.priceBar = this.backpackItem.locator('.pricebar');
        this.addToCartButton = this.priceBar.locator('button[data-test="add-to-cart-sauce-labs-backpack"]');
        this.removeButton = this.priceBar.locator('button[data-test="remove-sauce-labs-backpack"]');
    }

    // Check backpack is visible and ready to add
    async validateBackpackVisibility() {
        await expect(this.backpackItem).toBeVisible();
        await expect(this.backpackName).toHaveText(/Sauce Labs Backpack/);
        await expect(this.priceBar).toBeVisible();
        await expect(this.addToCartButton).toBeVisible();
    }

    // Add backpack to cart
    async backPackToBeAdded (){
        await this.validateBackpackVisibility();
        await this.addToCartButton.click();
    }

    // Main method to add backpack to cart
    async addBackpackToCart() {
        await this.validateBackpackVisibility();
        await this.backPackToBeAdded();
    }
}