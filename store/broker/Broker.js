const { DATA } = require("./BrokerType");
const { EquityWorker, OptionWorker, FutureWorker } = require("./utils");

class Broker {
  constructor(manager, page) {
    this.manager = manager;
    this.page = page;
    this.worker = null;
  }

  buildWorker() {
    const { TYPE } = this.page.getParams();

    switch (TYPE) {
      case DATA.EQUITY:
        this.worker = new EquityWorker(this.manager,this.page);
        break;
      case DATA.FUTURE:
        this.worker = new FutureWorker(this.manager,this.page);
        break;
      case DATA.OPTION:
        this.worker = new OptionWorker(this.manager,this.page);
        break;
      default:
        console.log("Invalid type: %s", TYPE);
    }

    return this.worker;
  }

  async deployWorker() {
    await this.worker.workflow();
  }

  async deployWorkerCached() {
    await this.worker.workflowCached();
  }
}

module.exports = { Broker };
