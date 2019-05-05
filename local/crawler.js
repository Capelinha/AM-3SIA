const {Builder, By, Key, until} = require('selenium-webdriver');
const Response = require('../lib/response');

// CORE
async function iterateElementData(parent, parentData) {

  let response = [];

  for(let childData of parentData){

    let childResponse = {
      name: childData.name,
      value: []
    };

    let childElements;
    switch (childData.type) {
      case 1:
        childElements = await parent.findElements(By.className(childData.selector));
        break;
      case 2:
        childElements = await parent.findElements(By.xpath(childData.selector));
        break;
      case 3:
        childElements = await parent.findElements(By.css(childData.selector));
      break;
      case 4:
        childElements = await parent.findElements(By.id(childData.selector));
      break;
    }
    for(let child of childElements){

      if(childData.children === undefined){
        childResponse.value = (await child.getText());
      }else{
        childResponse.value.push(await iterateElementData(child, childData.children));
      }
    }

    response.push(childResponse);
  } 
  return response;
}

function arrayToObject(array){
 
  const newObject = {};

  for(let item of array){
    const auxObject = {};
    auxObject[item.name] = item.value;
    Object.assign(newObject, auxObject);
  }
  return newObject;
}

function buildResponseObject(response){
 
  return response.map((e) => {
    const newObject = {};
    if(Array.isArray(e)){
      return arrayToObject(e);
    }else{
      if(Array.isArray(e.value)){
        newObject[e.name] = buildResponseObject(e.value);
      }else{
        newObject[e.name] = e.value;  
      }
      
    }
    return newObject;
  });
}

async function crawPage(page, elementsData){
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get(page);

    return await iterateElementData(driver, elementsData);

  }catch (e){
    console.log(e);
  } finally {
    await driver.quit();
  }
};

// VIEW

async function crawAndBuild(page, elementsData){
  console.log(JSON.stringify((buildResponseObject(await crawPage(page, elementsData)))));
}

async function craw(age, elementsData){
  console.log(JSON.stringify((await crawPage(page, elementsData))));
}

// CALLS

function crawEscavador(link){

  crawAndBuild(link,
  [{
    name: 'people',
    type: 3,
    selector: '.list-search>.item',
    children: [{
      name: 'name',
      type: 3,
      selector: '.item>a'
    },
    {
      name: 'description',
      type: 3,
      selector: '.content'
    }]
  }]);  
}

function crawJusbr(link){

  crawAndBuild(link,
  [{
    name: 'result',
    type: 3,
    selector: '.DocumentSnippet',
    children: [{
      name: 'title',
      type: 3,
      selector: '.BaseSnippetWrapper-title>a'
    },
    {
      name: 'body',
      type: 3,
      selector: '.BaseSnippetWrapper-body'
    }]
  }]);  
}

async function crawFacebook(link){
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('https://www.facebook.com/');
    const actions = await driver.actions({bridge: true})

    await actions.click(await driver.findElement(By.id('email'))).sendKeys('EMAIL');
    await actions.click(await driver.findElement(By.id('pass'))).sendKeys('PASS');
    await actions.click(await driver.findElement(By.css('#loginbutton>input'))).perform();

    await driver.get(link);


  }catch (e){
    console.log(e);
  } finally {
    await driver.quit();
  }
};


crawFacebook('LINK PROFILE /about');