const { ExchangeBuilder } = require('./utils/ExchangeBuilder');

class Page extends ExchangeBuilder {
    #expiry_data;
    #expiry_url;

    constructor(pageMeta) {
        super(pageMeta); // Pass meta to parent
        this.#expiry_data = [];
        this.#expiry_url = [];
    }

    getKey() {
        return this.getMeta().EXCHANGE;
    }

    getParams() {
        const { EXCHANGE, PAGE_URL, API_URL } = this.getMeta();
        return { EXCHANGE, PAGE_URL, API_URL };
    }

    // just delegate build to parent
    buildUrl(data) {
        const urls = super.buildUrl(data);
        this.#expiry_url.push(...urls);
    }

    getExpiryUrl() {
        return [...this.#expiry_url];
    }

    insertArray(data) {
        this.#expiry_data.push(...data);
    }

    getJsonData() {
        return JSON.stringify(this.#expiry_data);
    }
}

module.exports = { Page };
