import { Builder, By } from 'selenium-webdriver'
import assert from "assert"

describe("TEST 04", async () => {

  let driver;

  before(async function () {
    this.timeout(0)
    driver = new Builder().forBrowser("chrome").build();
    await driver.get("http://localhost:3000/04RHFAndUseActionState");
  })

  after(async () => {
    await driver.quit();
  });

  beforeEach(function () {
    this.timeout(0)
  });

  it("Ingreso vacio al form", async () => {
    await driver.findElement(By.name("title")).clear()
    await driver.findElement(By.name("title")).sendKeys("")

    await driver.findElement(By.name("content")).clear()
    await driver.findElement(By.name("content")).sendKeys("")

    await driver.findElement(By.css(`[type="submit"]`)).click()
    await driver.sleep(200)

    let titleErrorText = await driver.findElement(By.id("title-error")).getText()
    assert.strictEqual(titleErrorText, "Debe de tener mas de 1 caracter");

    let contentErrorText = await driver.findElement(By.id("content-error")).getText()
    assert.strictEqual(contentErrorText, "Debe de tener mas de 1 caracter");
  })

  it("Ingreso title=error al form", async () => {
    await driver.findElement(By.name("title")).clear()
    await driver.findElement(By.name("title")).sendKeys("error")

    await driver.findElement(By.name("content")).clear()
    await driver.findElement(By.name("content")).sendKeys("content")
    
    await driver.findElement(By.css(`[type="submit"]`)).click()
    await driver.sleep(2000)

    let serverErrorText = await driver.findElement(By.id("server-error")).getText()
    assert.strictEqual(serverErrorText, "No puede contener error");
  })

  it("Ingreso valido al form", async () => {
    await driver.findElement(By.name("title")).clear()
    await driver.findElement(By.name("title")).sendKeys("title")

    await driver.findElement(By.name("content")).clear()
    await driver.findElement(By.name("content")).sendKeys("content")
    
    await driver.findElement(By.css(`[type="submit"]`)).click()
    await driver.sleep(2000)

    let serverSuccessText = await driver.findElement(By.id("server-success")).getText()
    assert.strictEqual(serverSuccessText, "Todo creado satisfactoriamente");
  })


})