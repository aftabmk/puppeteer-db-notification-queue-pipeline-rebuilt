const { PageType } = require('../types');
const { Page, DataStore } = require('../store');

const pageBuilder = () => {

  const page1 = new Page(PageType.PageType_1);
  const page2 = new Page(PageType.PageType_2);

  DataStore.setPage(page1);
  DataStore.setPage(page2);
}

module.exports = { pageBuilder }