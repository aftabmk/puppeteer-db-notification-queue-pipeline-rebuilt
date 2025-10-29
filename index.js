const { DataStore } = require('./store');
const { workflow, pageBuilder } = require('./utils');


const main = async () => {
  pageBuilder();
  await workflow();

  const [page1, ...rest] = DataStore.getAllPages();
  const payload = page1.getJsonData();
  debugger
};

main();
