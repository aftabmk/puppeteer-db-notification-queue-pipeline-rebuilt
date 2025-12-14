const { DataTypes } = require("../../types");
const { EquityWorker, OptionWorker, FutureWorker } = require("../worker");

class Broker {
  constructor(manager, page) {
    this.page = page;
    this.worker = null;
    this.manager = manager;
  }

  buildWorker() {
    const { TYPE } = this.page.getParams();

    switch (TYPE) {
      case DataTypes.EQUITY:
        this.worker = new EquityWorker(this.manager,this.page);
        break;
      case DataTypes.FUTURE:
        this.worker = new FutureWorker(this.manager,this.page);
        break;
      case DataTypes.OPTION:
        this.worker = new OptionWorker(this.manager,this.page);
        break;
      default:
        console.log("Invalid type: %s", TYPE);
    }

    return this.worker;
  }

  async deployWorker() {
    await this.worker.workflow();
    // debugger;
  }

  async deployWorkerCached() {
    await this.worker.workflowCached();
  }
}

module.exports = { Broker };
