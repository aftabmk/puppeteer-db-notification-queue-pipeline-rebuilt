const { WorkFlowBuilder } = require("./utils/WorkFlowBuilder");
const { Broker } = require('../broker/Broker');
class WorkFlow extends WorkFlowBuilder {
  constructor(manager, page) {
    super(manager, page);
    this.bindLogger();
  }
  
  bindLogger() {
    // binding to find function runtime
    const { EXCHANGE, TYPE } = this.page.getParams();
    super._logId = EXCHANGE + '_' + TYPE;
    super._bindLogging();

    const broker = Broker.getInstance(this.manager,this.page);
    broker.getWorker()
    broker.deployWorker();
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
