const { WorkerUtils } = require("./utils/WorkerUtils");
const { TOPIC_ARN, AWS_REGION } = require("../../../../constant");
const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");

class Worker extends WorkerUtils {
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
    this.result = await this.manager.evaluator.fetchInsidePage(exchange, api_url);
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
      (method) => method !== "constructor" && typeof this[method] === "function" && !method.startsWith("_")
    );
    return publicMethods;
  }
}

module.exports = { Worker };
