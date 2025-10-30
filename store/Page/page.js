const { ExchangeBuilder } = require('./utils/ExchangeBuilder');

class Page extends ExchangeBuilder {
    #expiry_url;
    #expiry_data;

    constructor(pageMeta) {
        super(pageMeta); 
        this.#expiry_url = [];
        this.#expiry_data = [];
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

    toggleCompleted() {
        this.completed = ! this.completed;
    }
    insertArray(data) {
        this.#expiry_data = data;
    }
    
    getJsonData() {
        return JSON.stringify(this.#expiry_data);
    }

    clearExpiry() {
        this.#expiry_data = [];
    }

}

module.exports = { Page };
