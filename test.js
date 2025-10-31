const { DataStore, WorkFlow } = require('./store')
const { pageBuilder , buildBrowser} = require('./utils');

const main = async () => {
  const manager = await buildBrowser();
  
  pageBuilder()
  const [page_1,page_2] = DataStore.getAllPages();
  const pages = [page_1];

  let workflow_1 = new WorkFlow(manager,page_1);
  // let workflow_2 = new WorkFlow(manager,page_2);

  const workflows = [workflow_1];

  await Promise.allSettled(workflows.map(work => work.workflow()));


  const arr = [
    page_1.getJsonData(),
    // page_2.getJsonData()
  ];


  await Promise.allSettled(workflows.map(work => work.workflowCache()));

  debugger;

}

main()