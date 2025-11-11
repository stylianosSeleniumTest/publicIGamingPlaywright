import { test } from '@playwright/test';
import { visitUrl } from '../utils';
import { LogInPage } from '../page-objects-demo/login-page';
import { InventoriesPage } from '../page-objects-demo/inventories-page';
import { CartPage } from '../page-objects-demo/cart-page';
import { useBrandEnvHook, userDetailsHook } from '../hooks'
import { EnumEnvironmentTypes, EnumBrandsTypes, EnumUserRoles } from '../enum-parameters';


//use the reusable env hook to get the correct enum type env and brand
const { currentUrl } = useBrandEnvHook(EnumEnvironmentTypes.production, EnumBrandsTypes.saucedemo);
//use the reusable user details hook to get the correct enum type env and user role
const { userEmail, userPassword } = userDetailsHook(EnumEnvironmentTypes.production, EnumUserRoles.demostrator);


test.describe('Demo Test Example - Log IN', () => {

    test('Log in To  Demo App Add ,a backPack Product', async ({ page }) => {
        //cofirm demo url exists
        if (!currentUrl) {
            throw new Error('Demo URL not found in brands array');
        }
     //navigate to demor ulr 
        await visitUrl(page, currentUrl);
        //create instance of the page object
        const LoginPage = new LogInPage(page);
        //use the login method from the page object
        await LoginPage.logInToApp(userEmail, userPassword)
        //create instance of the inventories page object
        const inventoriesPage = new InventoriesPage(page);
        await inventoriesPage.addBackpackToCart();
        //create instance of the cart page object
        const cartPage = new CartPage(page);
        await cartPage.completeCheckoutFlow();

    })
})
