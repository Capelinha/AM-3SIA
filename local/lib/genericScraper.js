const {Builder} = require('selenium-webdriver');
const IteratePage = require('./iteratePage');

const scrape = async (page, elementsData) => {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get(page);

    return await IteratePage.iterateElementData(driver, elementsData, true);

  }catch (e){
    console.log(e);
  } finally {
    await driver.quit();
  }
};

module.exports = {scrape};