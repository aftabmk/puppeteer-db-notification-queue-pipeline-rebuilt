const { PageParams, WaitUntil } = require("../../../../types");

class WorkerUtils {
  constructor(manager, page) {
    this.page = page;
    this.manager = manager;
    
    this.params = {
      api_url: null,
      exchange: null,
      page_url: null,
      waitUntil: null,
      type : null,
      key : null
    };

    this.result = [];
    this.filterDataArray = [];
    
    this.#buildParams();
  }
  // params WorkerUtils
  #getPageParams(param) {
    // const { param } = getParam()
    return this.page.getParams()[param];
  }

  #buildParams() {
    this.params.waitUntil = WaitUntil.DOM_CONTENT_LOADED;
    this.params.type      = this.#getPageParams(PageParams.TYPE);
    this.params.api_url   = this.#getPageParams(PageParams.API_URL);
    this.params.page_url  = this.#getPageParams(PageParams.PAGE_URL);
    this.params.exchange  = this.#getPageParams(PageParams.EXCHANGE);
    
    this.params.key = this.page.getKey();
  }
}

module.exports = { WorkerUtils };
