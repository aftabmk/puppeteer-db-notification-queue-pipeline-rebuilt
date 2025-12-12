const { DATA } = require("./BrokerType");
const { EquityWorker, OptionWorker, FutureWorker } = require("./utils");

class Broker {
  constructor(manager, page) {
    this.manager = manager;
    this.page = page;
    this.worker = null;
  }

  buildWorker() {
    const { EXCHANGE, TYPE } = this.page.getParams();

    switch (TYPE) {
      case DATA.EQUITY:
        this.worker = new EquityWorker(EXCHANGE);
        break;
      case DATA.FUTURE:
        this.worker = new FutureWorker(EXCHANGE);
        break;
      case DATA.OPTION:
        this.worker = new OptionWorker(EXCHANGE);
        break;
      default:
        console.log("Invalid type:", TYPE);
    }

    return this.worker;
  }

  deployWorker() {
    return this.worker;
  }
}

module.exports = { Broker };
