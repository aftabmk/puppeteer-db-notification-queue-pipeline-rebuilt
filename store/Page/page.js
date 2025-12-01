const zlib = require("zlib");
const { ExchangeBuilder } = require("./utils/ExchangeBuilder");

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
    const { EXCHANGE, TYPE ,PAGE_URL, API_URL } = this.getMeta();
    return { EXCHANGE, TYPE ,PAGE_URL, API_URL };
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
    this.completed = !this.completed;
  }
  insertArray(data) {
    this.#expiry_data = data;
  }

  getData() {
    const { EXCHANGE, TYPE } = this.getParams();
    const data = this.#expiry_data;
    const json = JSON.stringify({EXCHANGE,TYPE,data});
    // Compress with gzip
    const compressed = zlib.gzipSync(json); 
    return compressed.toString("base64");
  }

  clearExpiry() {
    this.#expiry_data = [];
  }

  isCached() {
    // if no prev expiry link created , running fresh instance
    return this.#expiry_url.length != 0;
  }
}

module.exports = { Page };
