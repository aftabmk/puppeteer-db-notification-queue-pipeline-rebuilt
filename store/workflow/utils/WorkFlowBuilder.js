const { PageParams, WaitUntil } = require("../../../types");

class WorkFlowBuilder {
  #page;#manager;
  constructor(manager, page) {
    this.params = {
      api_url: null,
      exchange: null,
      page_url: null,
      waitUntil: null,
    };
    
    this.#buildParams(manager,page);
  }

  #getPageParams(param) {
    return this.#page.getParams()[param];
  }
  
  #buildParams(manager,page) {
    this.#page = page;
    this.#manager = manager;
    
    this.params.waitUntil = WaitUntil.DOM_CONTENT_LOADED;
    this.params.api_url = this.#getPageParams(PageParams.API_URL);
    this.params.page_url = this.#getPageParams(PageParams.PAGE_URL);
    this.params.exchange = this.#getPageParams(PageParams.EXCHANGE);
  }

  async navigate() {
    const waitUntil = WaitUntil.DOM_CONTENT_LOADED;
    const exchange = this.#getPageParams(PageParams.EXCHANGE);
    const page_url = this.#getPageParams(PageParams.PAGE_URL);

    const page = await this.#manager.pageManager.newPage(exchange);
    await page.goto(page_url, { waitUntil });
  }
}

module.exports = { WorkFlowBuilder };
