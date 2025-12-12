const { DATA } = require('./BrokerType');
const { EquityWorker, OptionWorker, FutureWorker } = require('./utils');

class Broker {
    static instance = null;   // holds the singleton instance

    constructor(manager, page) {
        if (Broker.instance) return Broker.instance;   // enforce singleton

        this.manager = manager;
        this.page = page;
        this.worker = {
            EQUITY : null, FUTURE : null, OPTION : null 
        };

        Broker.instance = this;  // store the singleton
    }

    static getInstance(manager, page) {
        if (!Broker.instance) {
            Broker.instance = new Broker(manager, page);
        }
        return Broker.instance;
    }

    getWorker() {
        const { EXCHANGE, TYPE } = this.page.getParams();

        switch (TYPE) {
            case DATA.EQUITY:
                this.worker.EQUITY = new EquityWorker(EXCHANGE);
                break;
            case DATA.FUTURE:
                this.worker.FUTURE = new FutureWorker(EXCHANGE);
                break;
            case DATA.OPTION:
                this.worker.OPTION = new OptionWorker(EXCHANGE);
                break;
            default:
                console.log("Type failed at %s", __filename);
                break;
        }
    }

    deployWorker() {
        console.log(this.worker);
    }
}

module.exports = { Broker };
