// store/builders/ExchangeBuilder.js
const { EXCHANGE_1, EXCHANGE_100 } = require('../../../constant');

class ExchangeBuilder {
    #meta;
    constructor(meta) {
        if (new.target === ExchangeBuilder) {
            throw new Error("Cannot instantiate abstract class ExchangeBuilder directly");
        }
        this.#meta = meta;
    }

    getMeta() {
        return this.#meta;
    }
    // parent builder method used by subclass
    buildUrl(data) {
        switch (this.#meta.EXCHANGE) {
            case EXCHANGE_1:
                return this.buildExchangeOne(data);
            case EXCHANGE_100:
                return this.buildExchangeTwo(data);
            default:
                throw new Error(`Unknown exchange type: ${this.meta.EXCHANGE}`);
        }
    }

    // shared implementations for different exchanges
    buildExchangeOne(data) {
        return data.map(date => this.#meta.URL_BUILDER + date);
    }

    buildExchangeTwo(data) {
        // debugger
        return data.map(date => this.#meta.URL_BUILDER.replace('X',date));
    }
}

module.exports = { ExchangeBuilder };
