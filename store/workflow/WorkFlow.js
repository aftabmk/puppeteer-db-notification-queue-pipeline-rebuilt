const { Manager } = require('./utils/Manager');
const { PageParams, WaitUntil } = require('../../types');

class WorkFlow extends Manager {
  constructor(manager,page) {
    super();
    this.page = page;
    this.manager = manager
  }

  getPageParams(param) {
    return this.page[param];
  }

  async navigate() {
    const waitUntil = WaitUntil.DOM_CONTENT_LOADED;
    const exchange = this.getPageParams(PageParams.EXCHANGE);
    const page_url = this.getPageParams(PageParams.PAGE_URL);

    const page = await this.manager.pageManager.newPage(exchange)
    await page.goto(page_url,{waitUntil});
  }


}

module.exports = { WorkFlow };
