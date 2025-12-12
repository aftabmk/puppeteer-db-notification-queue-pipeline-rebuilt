const { DATA } = require('./BrokerType')
const { EquityWorker, OptionWorker, FutureWorker } = require('./utils');
class Broker {
    constructor(manager,page) {
        this.manager = manager;
        this.page = page;
        this.worker = null;
    }

    getWorker() {
        const { EXCHANGE, TYPE } = this.page.getParams();

        switch(TYPE) {
            case DATA.EQUITY : {}
            case DATA.FUTURE : {}
            case DATA.OPTION : {}
        }
    }

    deployWorker() {}
};



module.exports = { Broker };