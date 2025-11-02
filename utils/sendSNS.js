const sendSNS = async (message) => {
  await sns
    .publish({
      TopicArn: process.env.TOPIC_ARN,
      Message: message,
    })
    .promise();
};

module.exports = { sendSNS };