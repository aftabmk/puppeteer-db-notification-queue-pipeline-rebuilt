const { WorkFlowBuilder } = require("./utils/WorkFlowBuilder");

class WorkFlow extends WorkFlowBuilder {
  constructor(manager, page) {
    super(manager, page);
    
    const { EXCHANGE, TYPE } = page.getParams();
    
    // binding to find function runtime
    super._logId = EXCHANGE + '_' + TYPE;
    super._bindLogging();
  }
  
  async workflow() {
    await super.navigate();
    await super.fetch();
    super.processData();
    await super.fetchExpiry();
    await super.sendSNS();
  }
  
  async workflowCache() {
    super.clearPrevExpiryData();
    await super.fetchExpiry();
    await super.sendSNS();
  }
}

module.exports = { WorkFlow };
