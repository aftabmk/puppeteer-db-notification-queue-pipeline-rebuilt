const { WorkFlowBuilder } = require("./utils/WorkFlowBuilder");

class WorkFlow extends WorkFlowBuilder {
  constructor(manager, page) {
    super(manager, page);
  }

  async workflow() {
    await super.navigate();
    await super.fetch();
    super.processData();
    await super.fetchExpiry()
  }

  async workflowCache() {
    debugger
    super.clearPrevExpiryData();
    debugger
    await super.fetchExpiry()
  }
}

module.exports = { WorkFlow };
