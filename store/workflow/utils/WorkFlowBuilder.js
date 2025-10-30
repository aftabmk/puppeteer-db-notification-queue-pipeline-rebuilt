const { Builder } = require("./utils/Builder");
const { EXCHANGE_1, EXCHANGE_2 } = require("../../../constant");
class WorkFlowBuilder extends Builder {
  constructor(manager, page) {
    super(manager, page);
  }

  async navigate() {
    const { waitUntil, exchange, page_url } = this.params;

    const page = await this.manager.pageManager.newPage(exchange);
    await page.goto(page_url, { waitUntil });
  }

  async fetch() {
    const { exchange, api_url } = this.params;
    this.result = await this.manager.evaluator.fetchInsidePage(
      exchange,
      api_url
    );
  }

  processData() {
    const { exchange } = this.params;

    switch (exchange) {
      case EXCHANGE_1:
        this.processDataExchangeOne();
        break;
      case EXCHANGE_2:
        this.processDataExchangeTwo();
        break;
      default:
        throw new Error(`❌ Unsupported exchange type: ${exchange}`);
    }

    // debugger
    this.page.buildUrl(this.format);
  }

  async fetchExpiry() {
    const { exchange: EXCHANGE } = this.params;
    const expiryUrls = this.page.getExpiryUrl();

    const results = await Promise.allSettled(
      expiryUrls.map(expiryUrl => this.manager.evaluator.fetchInsidePage(EXCHANGE, expiryUrl))
    );

    this.filterData(results);    
    
    
    if(this.filterDataArray.length)
      this.page.insertArray(this.filterDataArray);
    
    this.filterDataArray = [];
    // debugger
  }
  
  // if cache found delete prev expiry Data
  clearPrevExpiryData() {
    this.page.clearExpiry();
  }
}

module.exports = { WorkFlowBuilder };
