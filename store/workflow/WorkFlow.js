const { Broker } = require('../broker/Broker');
const { WorkFlowBuilder } = require("./utils/WorkFlowBuilder");
class WorkFlow extends WorkFlowBuilder {
  constructor(manager, page) {
    super(manager, page);
    this.broker = null;

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
    this.broker = new Broker(this.manager,this.page);
    this.broker.buildWorker()
  }
  
  async workflow() {
    await super.navigate();
    await super.fetch();
    super.processData();
    await super.fetchExpiry();
    // await super.sendSNS();
    // this.broker.deployWorker();
  }
  
  async workflowCache() {
    super.clearPrevExpiryData();
    await super.fetchExpiry();
    // await super.sendSNS();
    // this.broker.deployWorkerCached();
  }
}

module.exports = { WorkFlow };
