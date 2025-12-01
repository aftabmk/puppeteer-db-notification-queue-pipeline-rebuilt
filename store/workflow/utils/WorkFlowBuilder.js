const { Builder } = require("./utils/Builder");
const { Logger } = require("../../logger/Logger");
const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");
const { EXCHANGE_1, EXCHANGE_2, TOPIC_ARN, AWS_REGION } = require("../../../constant");
class WorkFlowBuilder extends Builder {
  constructor(manager, page) {
    super(manager, page);

    this._logId = "";
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
      expiryUrls.map((expiryUrl) =>
        this.manager.evaluator.fetchInsidePage(EXCHANGE, expiryUrl)
      )
    );

    this.filterData(results);

    if (this.filterDataArray.length)
      this.page.insertArray(this.filterDataArray);

    this.filterDataArray = [];
    // debugger
  }

  // if cache found delete prev expiry Data
  clearPrevExpiryData() {
    this.page.clearExpiry();
  }

  async sendSNS() {
    const sns = new SNSClient({ region: AWS_REGION });
    try {
      const message = this.page.getData();

      const command = new PublishCommand({
        TopicArn: TOPIC_ARN,
        Message: message,
      });

      const response = await sns.send(command);

      return response;
    } catch (e) {
      console.error("Error sending SNS:", e);
      throw e;
    }
  }

  _bindLogging() {
    const methods = this._filterMethods();

    for (const method of methods) {
      const original = this[method].bind(this);

      this[method] = async (...args) => {
        const start = Logger.start(this._logId, method);
        try {
          return await original(...args);
        } finally {
          Logger.end(this._logId, method, start);
        }
      };
    }
  }

  _filterMethods() {
    const allMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
    const publicMethods = allMethods.filter(
      (method) =>
        method !== "constructor" &&
        typeof this[method] === "function" &&
        !method.startsWith("_")
    );
    return publicMethods;
  }
}

module.exports = { WorkFlowBuilder };
