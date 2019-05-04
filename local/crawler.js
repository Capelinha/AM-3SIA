const {Builder, By, Key, until} = require('selenium-webdriver');
const Response = require('../lib/response');

async function craw(page, parentElementData, elementsData){
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get(page);
    let parentElement;
    switch (parentElementData.type) {
      case 1:
        parentElement = await driver.findElements(By.className(parentElementData.selector));
        break;
      case 2:
        parentElement = await driver.findElements(By.xpath(parentElementData.selector));
        break;
    }
    
    let response = {
      request: elementsData,
      response: []
    };

    for(let element of parentElement){
      itemResponse = [];

      for(let item of elementsData){
        let itemData = "";

        switch (item.type) {
          case 1:
            itemData = await element.findElement(By.className(item.selector)).getText();
            break;
          case 2:
            itemData = await element.findElement(By.xpath(item.selector)).getText();
            break;
        }

        itemResponse.push({
          selector: item.name,
          data: itemData
        });
      }

      response.response.push(itemResponse);
      console.log(response.response);
    }

    console.log(Response.success(response));

  }catch (e){
    console.log(e);
  } finally {
    await driver.quit();
  }
};

craw('https://twitter.com/jairbolsonaro',
    {
      'selector': '//*[starts-with(@class,"tweet")]/div[2]',
      'type': 2
    } ,[
    {
      'name': 'elapsedTime',
      'type': 1,
      'selector': '_timestamp'
    },
    {
      'name': 'tweetText',
      'type': 1,
      'selector': 'tweet-text'
    },
    {
      'name': 'likes',
      'type': 1,
      'selector': 'ProfileTweet-actionCountForPresentation'
    }
  ]);
