const { WorkerUtils } = require("./utils/WorkerUtils");
const { TOPIC_ARN, QUEUE_URL ,AWS_REGION } = require("../../../constant");
const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");
const { SQSClient, SendMessageCommand } = require("@aws-sdk/client-sqs");

class Worker extends WorkerUtils {
  constructor(manager, page) {
    super(manager, page);
  }

  async navigate() {
    const { waitUntil, page_url, key } = this.params;

    const page = await this.manager.pageManager.newPage(key);
    await page.goto(page_url, { waitUntil });
  }

  async fetch() {
    console.log(this.params);
    const { key, api_url } = this.params;
    // find page with key and fetch api
    this.result = await this.manager.evaluator.fetchInsidePage(key, api_url);
  }

  // { status, value : { status, data, message }};
  filterData(payloadArr) {
    // debugger;
    for (let payload of payloadArr) {
      const { data, status } = payload;
      if (status === 200) this.filterDataArray.push(data);
    }
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
      // debugger;
      // set cache
      this.page.setCache();

      return response;
    } catch (e) {
      console.error("Error sending SNS:", e);
      throw e;
    }
  }

  async sendSQS() {
    const sqs = new SQSClient({ region: AWS_REGION });

    try {
      // Raw binary Buffer (MessagePack)
      const message = this.page.getData(); // Buffer

      const command = new SendMessageCommand({
        QueueUrl: QUEUE_URL,
        MessageBody: message, // Buffer is allowed
      });

      const response = await sqs.send(command);

      // set cache
      this.page.setCache();

      return response;
    } catch (e) {
      console.error("Error sending SQS:", e);
      throw e;
    }
  }
}

module.exports = { Worker };
