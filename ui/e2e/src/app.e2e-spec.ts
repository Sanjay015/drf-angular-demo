import { browser, element, by, logging } from 'protractor';
import * as fs from 'fs';

async function enterText(selector: string, value: string) {
  const inputElement = element(by.css(selector));
  await inputElement.clear();
  await inputElement.sendKeys(value);
  return inputElement;
}

async function enterFormData(formControlName: string, value: string) {
  return await enterText(
    `[formControlName="${formControlName}"]`,
    value
  );
}

describe('App', () => {
  afterAll(async () => {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    console.log(logs);
  });

  beforeAll(async () => {
    await browser.get(browser.baseUrl);
    await enterText('#username', 'user_a');
    await enterText('#password', 'user_a');
    await element(by.css('#login-button')).click();
  });

  describe('Create Page', async () => {
    it('can submit a form and create a new item', async () => {
      await element(by.linkText('Create')).click();
      const pageHeading = await element(by.css('h2')).getText();
      expect(pageHeading).toEqual('Create Tour Package');

      const inputName = element(by.css('input[formControlName="name"]'));
      expect(await inputName.getAttribute('value')).toEqual('Tour Package');
      enterFormData('name', 'New Tour Package');
      expect(await inputName.getAttribute('value')).toEqual('New Tour Package');
      await enterFormData('category', 'testing');
      await enterFormData('tourLength', '10');
      await enterFormData('price', '123.99');
      await enterFormData('promo', 'test');
      expect(element(by.buttonText('Create')).isPresent()).toBe(true);
      await element(by.buttonText('Create')).click();
      expect(element(by.buttonText('Yes')).isPresent()).toBe(true);
      await element(by.buttonText('Yes')).click();
      await browser.sleep(100);
      expect(element(by.buttonText('Create')).isPresent()).toBe(false);
      expect(element(by.buttonText('Update')).isPresent()).toBe(true);
    });
  });

  const screenshot = async (filename) => {
    return browser.takeScreenshot().then((png) => {
      const stream = fs.createWriteStream(`e2e/screenshots/${filename}`);
      stream.write(new Buffer(png, 'base64'));
      stream.end();
    });
  };

  describe('List Page', async () => {
    it('lists items', async () => {
      await element(by.linkText('List')).click();
      const pageHeading = await element(by.css('h2')).getText();
      expect(pageHeading).toEqual('Tours Available');

      await browser.sleep(500);
      await screenshot('initial_list.png');

      expect(element(by.cssContainingText('.mat-chip', '1 day')).isPresent()).toBe(true);
      expect(element(by.cssContainingText('.mat-chip', '2 days')).isPresent()).toBe(true);
      await element(by.cssContainingText('.mat-chip', '2 days')).click();

      await browser.sleep(500);
      await screenshot('filtered_list.png');
    });
  });
});
