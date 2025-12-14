const { PageType } = require('../types');
const { Page, DataStore } = require('../store');

// generate pages to scrape
const pageRegistry = [
  new Page(PageType.PageType_1),
  new Page(PageType.PageType_2),
  new Page(PageType.PageType_3),

  new Page(PageType.PageType_100)
];

const pageBuilder = () => {
  DataStore.setPage(pageRegistry);
}


  module.exports = { pageBuilder }