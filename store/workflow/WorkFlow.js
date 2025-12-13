const { Broker } = require('../broker/Broker');
const { WorkFlowUtils } = require("./utils/WorkFlowUtils");
class WorkFlow extends WorkFlowUtils {
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
    await this.broker.deployWorker();
  }
  
  async workflowCache() {
    await this.broker.deployWorkerCached();
  }
}

module.exports = { WorkFlow };
