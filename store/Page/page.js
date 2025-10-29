const { EXCHANGE_1,EXCHANGE_2 } = require('../../constant');

class Page {
    constructor(page) {
        this.meta = page;
        this.expiry_url_array = [];

    }

    buildUrl(data) {
        switch(this.meta.EXCHANGE) {
            case EXCHANGE_1 : this.#buildUrlExchangeOne(data);
            case EXCHANGE_2 : this.#buildUrlExchangeTwo(data); 
        }
    }

    #buildUrlExchangeOne(data) {
        for(let date of data) {
            const expiry_url = this.meta.API_URL_BUILDER + date;
            this.expiry_url_array.push(expiry_url);
        }
    }

    #buildUrlExchangeTwo(data) {
        for(let date of data) {
            const expiry_url = this.meta.API_URL_BUILDER + date;
            this.expiry_url_array.push(expiry_url);
        }
    }

    getExpiryUrl() {
        return this.expiry_url_array;
    }
}

module.exports = { Page };