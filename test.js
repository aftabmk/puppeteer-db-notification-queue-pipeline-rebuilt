const { PageType } = require('./types');
const { Page } = require('./store');
const { DataStore } = require('./store')

const main = () => {

  const page1 = new Page(PageType.PageType_1);
  const page2 = new Page(PageType.PageType_2);

  DataStore.set(page1);
  DataStore.set(page2);

  const [p1,p2] = DataStore.getAll();
  debugger;
}

main()