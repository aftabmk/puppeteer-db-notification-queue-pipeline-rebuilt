const { DataStore, WorkFlow } = require('./store')
const { pageBuilder , buildBrowser} = require('./utils');

const main = async () => {
  const manager = await buildBrowser();
  
  pageBuilder()
  const [page_1,page_2] = DataStore.getAllPages();

  let workflow_1 = new WorkFlow(manager,page_1);
  let workflow_2 = new WorkFlow(manager,page_2);

  await Promise.all([
    workflow_1.workflow(),
    workflow_2.workflow(),
  ])
  debugger
}

main()