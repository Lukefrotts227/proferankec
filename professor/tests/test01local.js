import { test, expect } from '@playwright/test'; 


test('homepage is chilling', async ({ page }) => {
    await page.goto('http://localhost:3000');

    //  check if both search bars are present
    const searchBar = page.locator('SearchBar');
    await expect(searchBar).toHaveCount(2); 

    // cehck for top banner
    const topBanner = page.locator('TopBanner');
    await expect(topBanner).toHaveCount(1);
    // inside top banner there should be a login button
    const loginButton = page.locator('Login');
    await expect(loginButton).toHaveCount(1);
    // check if the login button is visible
    await expect(loginButton).toBeVisible();
    // testing branches
    
})