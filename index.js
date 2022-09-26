const { chromium } = require('playwright-extra');

const stealth = require('puppeteer-extra-plugin-stealth')();

chromium.use(stealth);

chromium.launch({ headless: true }).then(async browser => {
    try {
        const page = await browser.newPage();
        let xStart, yStart, xFinish, yFinish, elementHandle, rect;
        elementHandle = await page.locator('xpath=//html/body/div[3]/div[1]/div[1]/div[1]/div/ul/li[2]/ul/div/li[1]');
        await elementHandle.scrollIntoViewIfNeeded();
        rect = await elementHandle.boundingBox();
        xStart = rect.x + rect.width / 2;
        yStart = rect.y + rect.height / 2;
        elementHandle = await page.frameLocator('#editor-frame').locator('#empty-message-inner');

        await elementHandle.scrollIntoViewIfNeeded();
        rect = await elementHandle.boundingBox();
        xFinish = rect.x + rect.width / 2;
        yFinish = rect.y + rect.height / 2;

        await page.mouse.move(xStart, yStart);
        await page.mouse.down();
        await page.mouse.move(xFinish, yFinish);
        await page.mouse.up();
        return true;
    } catch (e) {
        return e
    }
})
