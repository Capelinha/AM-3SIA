const GenericScraper = require('../lib/genericScraper');

async function search(link){

  return GenericScraper.scrape(link,
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
  }], true);  
}

async function main(){
  console.log(JSON.stringify(await search('')));
}

main();