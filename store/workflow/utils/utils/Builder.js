const { PageParams, WaitUntil } = require("../../../../types");

class Builder {
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
    this.format = [];
    this.log = [];
    this.filterDataArray = []

    this.#buildParams();
  }
  // params builder
  #getPageParams(param) {
    return this.page.getParams()[param];
  }

  #buildParams() {
    this.params.waitUntil = WaitUntil.DOM_CONTENT_LOADED;
    this.params.api_url = this.#getPageParams(PageParams.API_URL);
    this.params.page_url = this.#getPageParams(PageParams.PAGE_URL);
    this.params.exchange = this.#getPageParams(PageParams.EXCHANGE);
  }

  // data processor
  processDataExchangeOne() {
    // debugger
    const { data : { expiryDates }, status , message } = this.result;
    if(status !== 200)
      throw new Error(`status : ${status} , message : ${message}`);
    else
      this.format = expiryDates.slice(0, 2);
  }
  
  processDataExchangeTwo() {
    const { data : { Table1 }, status , message } = this.result;
    if(status !== 200)
      throw new Error(`status : ${status} , message : ${message}`);
    else {
      const expiryDates = Table1.map(obj => obj.ExpiryDate);
      
      this.format = expiryDates.slice(0,2);
    }
  }

  filterData(payloadArr) {
    for(let payload of payloadArr) {
      const { value : { data , status }} = payload;
      if(status === 200)
        this.filterDataArray.push(data);

      const now = Date.now();
      this.log.push({date : now, status : status});
    }
  }

}

module.exports = { Builder };
