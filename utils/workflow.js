const { PageStore, WorkFlow } = require("../store");

class WorkflowInstance {
  static instance = null;

  constructor(manager) {
    this.manager = manager;
    this.pages = PageStore.getAllPages();
    this.workflows = this.pages.map((page) => new WorkFlow(manager, page));
  }

  
  // 🏗️ Singleton instance getter/creator
  static getInstance(manager) {
    if (!WorkflowInstance.instance) {
      WorkflowInstance.instance = new WorkflowInstance(manager);
    }
    return WorkflowInstance.instance;
  }

  // 🧹 Reset (useful for testing or re-init)
  static reset() {
    WorkflowInstance.instance = null;
  }
  
  // 🧩 Execute the actual workflow
  async run() {
    let isCached = this.pages.map((page) => page.isCached());
    await Promise.all(
      this.workflows.map((workflow, i) =>
        isCached[i] ? workflow.workflowCache() : workflow.workflow()
      )
    );
  }
}

module.exports = { WorkflowInstance };
