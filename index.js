const { DataStore } = require('./store');
const { workflow, pageBuilder } = require('./utils');


const main = async () => {
  console.time("start");
  pageBuilder();
  await workflow();

  const [ page1 ] = DataStore.getAllPages();
  const payload = page1.getJsonData();
  console.timeEnd("start");
  debugger
};

main();
