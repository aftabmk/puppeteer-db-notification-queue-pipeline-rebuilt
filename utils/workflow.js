const { DataStore, WorkFlow } = require('../store')

const workflow = async (manager) => {
  const pages = DataStore.getAllPages();
  const workflows = pages.map(page => new WorkFlow(manager, page));

  // Determine cache state for each page
  const isCached = pages.map(page => page.isCached());

  // Run workflowCache if cached, else run workflow
  // debugger
  await Promise.allSettled(
    workflows.map((work, i) => 
      isCached[i] ? work.workflowCache() : work.workflow()
    )
  );

  // Collect final data
  const data = pages.map(page => page.getData());
  return data;
};


module.exports = { workflow };
