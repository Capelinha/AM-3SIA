const GenericScraper = require('../lib/genericScraper');

async function search(link){

  return GenericScraper.scrape(link,
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

async function detail(link){

  return GenericScraper.scrape(link,
  [{
    name: 'data',
    type: 3,
    selector: '.states',
    children: [{
      name: 'processCount',
      type: 3,
      selector: '#usuario>div.container.-rel>div>header>div>div.body>div>div>div.state.-processos>span.heading.-like3.stateContent'
    },
  {
    name: 'name',
    type: 3,
    selector: '#usuario>div.container.-rel>div>header>div>div.body>div>div>div:nth-child(2)>a'
  },
    {
      name: 'location',
      type: 3,
      selector: '#usuario>div.container.-rel>div>header>div>div.body>div>div>div:nth-child(3)>span.heading.-like3.stateContent'
    }]
  },
  {
    name: 'process',
    type: 3,
    selector: '#processos>table>tbody>tr',
    children:[
    {
      name: 'type',
      type: 3,
      selector: '#processos>table>tbody>tr>td.bodyCol.type'
    },
    {
      name: 'number',
      type: 3,
      selector: '#processos>table>tbody>tr>td.bodyCol.number'
    },
    {
      name: 'people',
      type: 3,
      selector: '#processos>table>tbody>tr>td.bodyCol.envolvido'
    }]
  }]);  
}

async function main(){
  console.log(JSON.stringify(await search('LINK')));
}

main();