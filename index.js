const { pageBuilder, buildBrowser, workflow, sendSNS } = require("./utils");

const main = async () => {
  // create singleton browser instance
  const manager = await buildBrowser();
  // create required pages
  pageBuilder();
  // fetch json data after workflow complition
  const data = await workflow(manager);
  const SEPARATOR = '<|Split|>';

  // safely join into one string
  const message = data.join(SEPARATOR);

  // now you can send this via SNS
  // await sendSNS(message);
  // close browser instance
  debugger;
  manager.close();
};

const timer = async () => {
  console.time("Browser");
  await main();
  console.timeEnd("Browser");
};

timer();
