const { DataStore } = require('./store')
const { pageBuilder } = require('./utils');

const main = () => {
  pageBuilder()

  const [page1,page2] = DataStore.getAllPages();

  page1.buildUrl(['20-02-2025','10-09-2026']);
  page2.buildUrl(['10-04-2025','10-10-2016']);

  page1.insertArray([{"name" : "aftab"}])
  page2.insertArray([{"name" : "mohammed"}])

  const sns1 = {exchange : page1.getKey(), data : page1.getJsonData()}
  const sns2 = {exchange : page2.getKey(), data : page2.getJsonData()}

  debugger;
}

main()