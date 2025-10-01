import { expect, type Page, type Locator } from "@playwright/test";

export class CartPage {
    readonly page: Page;
    readonly cartIcon: Locator;
    readonly cartList: Locator;
    readonly cartItems: Locator;
    readonly checkoutButton: Locator;
    readonly urlEndPoint: string = '/cart.html'

    constructor(page: Page) {
        this.page = page;
        // Cart icon in the header
        this.cartIcon = page.locator('[data-test="shopping-cart-badge"]');
        // Cart list container
        this.cartList = page.locator('[data-test="cart-list"]');
        // All items in the cart
        this.cartItems = this.cartList.locator('[data-test="inventory-item"]');
        // Checkout button
        this.checkoutButton = page.locator('button[data-test="checkout"]');
    }

    // Clicks the cart icon and checks it has 1 item
    async clickCartIcon() {
        await expect(this.cartIcon).toBeVisible();
        await expect(this.cartIcon).toBeEnabled();
        await expect(this.cartIcon).toHaveText('1');
        await this.cartIcon.click();
    }

    // Ensures the user is on the cart page
    async enssureOnCartPage() {
        await this.page.waitForURL(new RegExp(`${this.urlEndPoint}$`), { timeout: 5000 });
        await expect(this.page).toHaveURL(new RegExp(`${this.urlEndPoint}$`));
    }

    // Checks that the cart has one item
    async assertCartHasOneItem() {
        await expect(this.cartList).toBeVisible();
        await expect(this.cartItems).toHaveCount(1);
        await expect(this.cartItems.first()).toBeVisible();
    }

    // Checks that the checkout button is ready
    async assertCheckoutButtonIsReady() {
        await expect(this.checkoutButton).toBeVisible();
        await expect(this.checkoutButton).toBeEnabled();
    }

    // Clicks the checkout button
    async clickCheckout() {
        await this.checkoutButton.click();
    }

    // Full flow: open cart, check, and proceed to checkout
    async completeCheckoutFlow() {
        await this.clickCartIcon();
        await this.enssureOnCartPage();
        await this.assertCartHasOneItem();
        await this.assertCheckoutButtonIsReady();
        await this.clickCheckout();
    }
}