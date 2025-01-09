import { Builder, By } from 'selenium-webdriver'
import assert from "assert"

describe("TEST 01", async () => {

  let driver;

  before(async function () {
    driver = new Builder().forBrowser("chrome").build();
    await driver.get("http://localhost:3000/01ClientAndServerAction/");
  })

  after(async () => {
    await driver.quit();
  });

  it("Ingreso vacio a title", async () => {
    await driver.findElement(By.name("title")).clear()
    await driver.findElement(By.name("title")).sendKeys("")
    await driver.findElement(By.css(`[type="submit"]`)).click()

    let loginErrorText = await driver.findElement(By.id("title-error")).getText()
    assert.strictEqual(loginErrorText, "Debe de tener mas de 1 caracter");
  })

})