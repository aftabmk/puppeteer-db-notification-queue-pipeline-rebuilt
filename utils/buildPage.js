const { PageType } = require('../types');
const { Page, DataStore } = require('../store');

const pageBuilder = () => {

  const page1 = new Page(PageType.PageType_1);
  const page2 = new Page(PageType.PageType_2);

  DataStore.set(page1);
  DataStore.set(page2);
}

module.exports = { pageBuilder }