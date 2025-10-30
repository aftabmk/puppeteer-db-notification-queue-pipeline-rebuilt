const { DataStore, WorkFlow } = require('./store')
const { pageBuilder , buildBrowser} = require('./utils');

const main = async () => {
  const manager = await buildBrowser();
  
  pageBuilder()
  const [page_1,page_2] = DataStore.getAllPages();

  let workflow_1 = new WorkFlow(manager,page_1);
  let workflow_2 = new WorkFlow(manager,page_2);

  await workflow_1.workflow()
  await workflow_2.workflow()

  // page1.buildUrl(['20-02-2025','10-09-2026']);
  // page2.buildUrl(['10-04-2025','10-10-2016']);

  // page1.insertArray([{"name" : "aftab"}])
  // page2.insertArray([{"name" : "mohammed"}])
  debugger
}

main()