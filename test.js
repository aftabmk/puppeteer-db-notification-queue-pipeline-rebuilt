const { DataStore, WorkFlow } = require('./store')
const { pageBuilder , buildBrowser} = require('./utils');

const main = async () => {
  const manager = await buildBrowser();
  
  pageBuilder()
  // const [pages1,pages2] = DataStore.getAllPages();
  const pages = DataStore.getAllPages();
  
  const workflows = pages.map(page => new WorkFlow(manager,page));

  await Promise.allSettled(workflows.map(work => work.workflow()));

  const arr = pages.map(page => page.getJsonData());


  await Promise.allSettled(workflows.map(work => work.workflowCache()));

  debugger;
  manager.close();
}

const timer = async() => {
  console.time("Browser")
  await main()
  console.timeEnd("Browser")
}

timer();