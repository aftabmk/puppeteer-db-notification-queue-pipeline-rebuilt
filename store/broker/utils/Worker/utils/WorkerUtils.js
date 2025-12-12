const { PageParams, WaitUntil } = require("../../../../../types");

class WorkerUtils {
  constructor(manager, page) {
    this.page = page;
    this.manager = manager;
    this.params = {
      api_url: null,
      exchange: null,
      page_url: null,
      waitUntil: null,
    };
    this.result = [];
    this.#buildParams();
  }
  // params WorkerUtils
  #getPageParams(param) {
    return this.page.getParams()[param];
  }

  #buildParams() {
    this.params.waitUntil = WaitUntil.DOM_CONTENT_LOADED;
    this.params.api_url = this.#getPageParams(PageParams.API_URL);
    this.params.page_url = this.#getPageParams(PageParams.PAGE_URL);
    this.params.exchange = this.#getPageParams(PageParams.EXCHANGE);
  }
}

module.exports = { WorkerUtils };
