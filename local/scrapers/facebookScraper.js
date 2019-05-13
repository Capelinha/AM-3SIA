const {Builder, By} = require('selenium-webdriver');
const IteratePage = require('../lib/iteratePage');

const EMAIL = 'EMAIL';
const PASS = 'PASSWORD';

async function crawFacebook(link){
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    await 
    await driver.get('https://mbasic.facebook.com/');
    const actions = await driver.actions({bridge: true})

    await actions.click(await driver.findElement(By.css('#m_login_email'))).sendKeys(EMAIL);
    await actions.click(await driver.findElement(By.css('#login_form > ul > li:nth-child(2) > div > input'))).sendKeys(PASS);
    await actions.click(await driver.findElement(By.css('#login_form > ul > li:nth-child(3) > input'))).perform();

    await driver.get(link);

    const res = await IteratePage.iterateElementData(driver, [{
      name: 'education',
      type: 3,
      selector: '#education > div > div:nth-child(2) > div',
      children: [{
        name: 'name',
        type: 3,
        selector: 'div > div > div:nth-child(1) > span'
      },
      {
        name: 'type',
        type: 3,
        selector: 'div > div > div:nth-child(2) > span'
      }]
    },
    {
      name: 'work',
      type: 3,
      selector: '#work >div >div:nth-child(2) > div',
      children: [{
        name: 'name',
        type: 3,
        selector: 'div > div > div:nth-child(1) > span > a'
      },
      {
        name: 'role',
        type: 3,
        selector: 'div > div > div:nth-child(2) > span'
      }, 
      {
        name: 'time',
        type: 3,
        selector: 'div > div > div:nth-child(3) > span'
      },
      {
        name: 'location',
        type: 3,
        selector: 'div > div > div:nth-child(4) > span'
      }]
    },
    {
      name: 'atual-city',
      type: 3,
      selector: 'div[title="Cidade atual"]' 
    },
    {
      name: 'hometown',
      type: 3,
      selector: 'div[title="Cidade natal"]' 
    },
    {
      name: 'contacts',
      type: 3,
      selector: '#contact-info > div > div:nth-child(2) > div',
      children: [{
        name: 'name',
        type: 3,
        selector: 'table > tbody > tr > td:nth-child(1)'
      },
      {
        name: 'data',
        type: 3,
        selector: 'table > tbody > tr > td:nth-child(2)'
      }]
    },
    {
      name: 'basic-info',
      type: 3,
      selector: '#basic-info > div > div:nth-child(2) > div',
      children: [{
        name: 'name',
        type: 3,
        selector: 'table > tbody > tr > td:nth-child(1)'
      },
      {
        name: 'data',
        type: 3,
        selector: 'table > tbody > tr > td:nth-child(2)'
      }]
    },
    {
      name: 'family',
      type: 3,
      selector: '#family > div > div:nth-child(2) > div',
      children: [{
        name: 'name',
        type: 3,
        selector: 'div > h3 > a'
      },
      {
        name: 'data',
        type: 3,
        selector: 'div > h3:nth-child(2)'
      }]
    },
    {
      name: 'bio',
      type: 3,
      selector: '#bio > div > div:nth-child(2) > div'
    },
    {
      name: 'year-overview',
      type: 3,
      selector: '#year-overviews > div > div:nth-child(2) > div  > div > div',
      children: [{
        name: 'year',
        type: 3,
        selector: 'div:nth-child(1)'
      },
      {
        name: 'description',
        type: 3,
        selector: 'div:nth-child(2) > div > a'
      }]
    }], true);

    return res;

  }catch (e){
    console.log(e);
  } finally {
    await driver.quit();
  }
};

async function main(){
  console.log(JSON.stringify(await crawFacebook('https://mbasic.facebook.com/NOME/about')));
}

main();