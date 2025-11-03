const { WorkFlowBuilder } = require("./utils/WorkFlowBuilder");

class WorkFlow extends WorkFlowBuilder {
  constructor(manager, page) {
    super(manager, page);
  }

  async workflow() {
    console.log("ran complete workflow")
    await super.navigate();
    await super.fetch();
    super.processData();
    await super.fetchExpiry()
    await super.sendSNS()
  }
  
  async workflowCache() {
    console.log("ran cached workflow")
    super.clearPrevExpiryData();
    await super.fetchExpiry()
    await super.sendSNS()
  }
}

module.exports = { WorkFlow };
