const {Builder, By, Key, until} = require('selenium-webdriver');
const Response = require('./lib/response');

async function x(){
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('https://twitter.com/jairbolsonaro');
    const tweets = await driver.findElements(By.xpath('//*[starts-with(@class,"tweet")]/div[2]'));
    
    let data = [];

    for(let tweet of tweets){
      const elapsedTime = await tweet.findElement(By.className('_timestamp')).getText();
      const tweetText = await tweet.findElement(By.className('TweetTextSize')).getText();
      const likes = await tweet.findElement(By.className('ProfileTweet-actionCountForPresentation')).getText();
      data.push({
        'elapsedTime' : elapsedTime,
        'tweetText' : tweetText,
        'likes' : likes
      });
    }

    console.log(Response.success(data));

  }catch (e){
    return Response.failure(e);
  } finally {
    await driver.quit();
  }
};


x();