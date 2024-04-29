const puppeteer = require ('puppeteer');
require('dotenv').config();

const email = String(process.env.EMAIL);
const password = String(process.env.PASSWORD);
const webPage = String(process.env.WEBPAGE);


async function main() {

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"]
    });

    const page = await browser.newPage();
    await page.goto(webPage);

    await page.waitForSelector('input[name="user[email]"]');
    
    await page.type('input[name="user[email]"]', email);
    await page.type('input[name="user[password]"]', password);
    
    const enter = await page.waitForSelector('input[value="Sign in"]');
    await enter.click();
    
    console.log(`${email} estas Logueado!`);
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const div = await page.waitForSelector('.q04vw');
    const entrada = await page.waitForSelector(`._1nz7aia3`);
    
    if (div) {
        console.log('Ya estas en la pagina de inicio');
    }

    if (entrada) {
        await entrada.click();
        
        await new Promise(resolve => setTimeout(resolve, 7000));
        await browser.close();
        return { msg: 'OK' };
    }
    await browser.close();
    return { msg: 'ERROR ' };
}


(async () => {
    try {
        const response = await main();
        console.log(response);
    } catch (error) {
        console.log(error);
        return error;
    }
})();
