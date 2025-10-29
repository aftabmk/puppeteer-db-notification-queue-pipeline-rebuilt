const { EXCHANGE_1, EXCHANGE_2 } = require('../../constant');

class Page {
    #meta; #expiry_data; #expiry_url;    

    constructor(page) {
        this.#meta = page;
        this.#expiry_data = [];
        this.#expiry_url = [];
    }

    getKey() {
        return this.#meta.EXCHANGE;
    }

    getParams() {
        const { EXCHANGE , PAGE_URL , API_URL } = this.#meta;
        return { EXCHANGE, PAGE_URL , API_URL };
    }

    // insert expiry dates
    buildUrl(data) {
        switch (this.#meta.EXCHANGE) {
            case EXCHANGE_1:
                this.#buildUrlExchangeOne(data);
                break;
            case EXCHANGE_2:
                this.#buildUrlExchangeTwo(data);
                break;
            default:
                throw new Error(`Unknown exchange: ${this.#meta.EXCHANGE}`);
        }
    }

    #buildUrlExchangeOne(data) {
        for (let date of data) {
            const expiry_url = this.#meta.URL_BUILDER + date;
            this.#expiry_url.push(expiry_url);
        }
    }

    #buildUrlExchangeTwo(data) {
        for (let date of data) {
            const expiry_url = this.#meta.URL_BUILDER + date;
            this.#expiry_url.push(expiry_url);
        }
    }

    getExpiryUrl() {
        return [...this.#expiry_url]; 
    }

    // insert json data of expiry
    insertArray(data) {
        for (let val of data) {
            this.#expiry_data.push(val);
        }
    }

    getJsonData() {
        return JSON.stringify(this.#expiry_data);
    }
}

module.exports = { Page };
