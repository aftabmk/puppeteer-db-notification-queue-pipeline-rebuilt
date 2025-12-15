const { PageType } = require('../types');
const { Page, PageStore } = require('../store');

// generate pages to scrape
const pageRegistry = [
  // Exchange 1
  new Page(PageType.PageType_1),
  new Page(PageType.PageType_2),
  new Page(PageType.PageType_3),
  // Exchange 2
  new Page(PageType.PageType_100),
  new Page(PageType.PageType_101),
];

const pageBuilder = () => {
  PageStore.setPage(pageRegistry);
}


  module.exports = { pageBuilder }