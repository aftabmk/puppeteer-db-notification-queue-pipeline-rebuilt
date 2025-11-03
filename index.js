const { pageBuilder, buildBrowser, workflow } = require("./utils");

const main = async () => {
  // create singleton browser instance
  const manager = await buildBrowser();
  // create required pages
  pageBuilder();
  // fetch json data after workflow complition
  const data = await workflow(manager);

  debugger;
  manager.close();
};

const timer = async () => {
  console.time("Browser");
  await main();
  console.timeEnd("Browser");
  debugger;
};

timer();
