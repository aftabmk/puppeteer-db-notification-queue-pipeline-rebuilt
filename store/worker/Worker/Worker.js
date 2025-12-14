const { WorkerUtils } = require("./utils/WorkerUtils");
const { TOPIC_ARN, AWS_REGION } = require("../../../constant");
const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");

class Worker extends WorkerUtils {
  constructor(manager, page) {
    super(manager, page);
  }

  async navigate() {
    const { waitUntil, page_url,key } = this.params;

    const page = await this.manager.pageManager.newPage(key);
    await page.goto(page_url, { waitUntil });
  }

  async fetch() {
    const { key, api_url } = this.params;
    this.result = await this.manager.evaluator.fetchInsidePage(key, api_url);
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

  filterData(payloadArr) {
    for (let payload of payloadArr) {
      const {
        value: { data, status },
      } = payload;
      if (status === 200) this.filterDataArray.push(data);
    }
  }
}

module.exports = { Worker };
