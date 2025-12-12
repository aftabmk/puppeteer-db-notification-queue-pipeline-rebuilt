const { WorkFlowBuilder } = require("./utils/WorkFlowBuilder");
const { Broker } = require('../broker/Broker');
class WorkFlow extends WorkFlowBuilder {
  constructor(manager, page) {
    super(manager, page);

    this._bindLogger();
    this._assignWorker();
  }
  
  _bindLogger() {
    // binding to find function runtime
    const { EXCHANGE, TYPE } = this.page.getParams();
    super._logId = EXCHANGE + '_' + TYPE;
    super._bindLogging();
  }
  
  _assignWorker() {
    const broker = new Broker(this.manager,this.page);
    broker.buildWorker()
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
