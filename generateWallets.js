const puppeteer = require('puppeteer');

(async () => {
    // Launch a headless Chrome browser
    const browser = await puppeteer.launch({ headless: true });
    
    // Open a new page
    const page = await browser.newPage();
    
    // Navigate to the Aleo Tools website
    await page.goto('https://aleo.tools/');

    // Generate wallets and save their details to a file
    for (let i = 0; i < 100; i++) {
        // Click the "Generate" button
        await page.waitForSelector('button.ant-btn-primary');
        await page.click('button.ant-btn-primary');

        // Extract the values of the Private Key, View Key, and Address inputs
        const privateKey = await page.$eval('input[placeholder="Private Key"].ant-input', el => el.value);
        const viewKey = await page.$eval('input[placeholder="View Key"].ant-input', el => el.value);
        const address = await page.$eval('input[placeholder="Address"].ant-input', el => el.value);

        // Save the wallet details to a file
        const fs = require('fs');
        fs.appendFileSync('wallets.txt', `Private Key: ${privateKey}, View Key: ${viewKey}, Address: ${address}\n`);
    }

    // Close the browser
    await browser.close();
})();
