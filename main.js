const { pageBuilder, buildBrowser, WorkflowInstance } = require("./utils");
const { Logger } = require('./store/logger/Logger');

const main = async () => {
  const manager = await buildBrowser();
  pageBuilder();
  // Create or get the workflow instance
  const workflow = WorkflowInstance.getInstance(manager);
  // Run the workflow
  await workflow.run();
  debugger
};

const close = async() => {
    const manager = await buildBrowser();
    manager.close();
    Logger.log();
}

module.exports = { main, close };