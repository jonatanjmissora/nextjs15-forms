import { Builder } from 'selenium-webdriver'
import assert from "assert"

describe("ACCESO A LA APP", async () => {

    let driver;

    before(async function () {
        driver = new Builder().forBrowser("chrome").build();
        await driver.get("http://localhost:3000/");
    })

    after(async () => {
        await driver.quit();
    });

    it("Ingreso a la applicacion", async () => {
        const title = await driver.getTitle();
        assert.strictEqual(title, 'Next.js + mongosb')
    })

})