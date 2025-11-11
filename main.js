const { pageBuilder, buildBrowser, WorkflowInstance } = require("./utils");

const main = async () => {
  const manager = await buildBrowser();
  pageBuilder();
  // Create or get the workflow instance
  const workflow = WorkflowInstance.getInstance(manager);
  // Run the workflow
  await workflow.run();
};

const close = async() => {
    const manager = await buildBrowser();
    manager.close();
}

module.exports = { main, close };