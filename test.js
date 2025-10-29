const { PageType } = require('./types');
const { Page } = require('./store');
const { DataStore } = require('./store')

const main = () => {

  const page1 = new Page(PageType.PageType_1);
  const page2 = new Page(PageType.PageType_2);

  DataStore.set(page1);
  DataStore.set(page2);

  const hasPage1 = DataStore.has(page1.getKey());
  const hasPage2 = DataStore.has(page2.getKey());
  debugger;
}

main()