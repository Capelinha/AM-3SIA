const {By} = require('selenium-webdriver');

const iterateElementData = async (parent, parentData, build) => {

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
  
  return build ? _buildObject(response) : response;
}

const _arrayToObject = (array) => {
 
  const newObject = {};

  for(let item of array){
    const auxObject = {};
    auxObject[item.name] = item.value;
    Object.assign(newObject, auxObject);
  }
  return newObject;
}

const _buildObject = (response) => {
 
  return response.map((e) => {
    const newObject = {};
    if(Array.isArray(e)){
      return _arrayToObject(e);
    }else{
      if(Array.isArray(e.value)){
        newObject[e.name] = _buildObject(e.value);
      }else{
        newObject[e.name] = e.value;  
      }
      
    }
    return newObject;
  });
}

module.exports = {iterateElementData};