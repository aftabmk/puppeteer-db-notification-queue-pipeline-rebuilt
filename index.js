const { pageBuilder, buildBrowser, WorkflowInstance } = require("./utils");


const main = async () => {
  const manager = await buildBrowser();
  pageBuilder();
  // Create or get the workflow instance
  const workflow = WorkflowInstance.getInstance(manager);
  // Run the workflow
  await workflow.run();

  // manager.close();
};

const timer = async () => {
  let index = 0
  while(index < 2) {
    console.time("workFlow");
    await main();
    console.timeEnd("workFlow");

    console.log("wait 60 sec")
    await new Promise(resolve => setTimeout(resolve, 30_000));
    index ++;
  }
  console.log("finished");
};

timer();
