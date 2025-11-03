const zlib = require("zlib");
const { ExchangeBuilder } = require("./utils/ExchangeBuilder");

class Page extends ExchangeBuilder {
  #expiry_url;
  #expiry_data;

  constructor(pageMeta) {
    super(pageMeta);
    // ~240 KB safe buffer;
    this.maxBytes = 240 * 1024;
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
    this.completed = !this.completed;
  }
  insertArray(data) {
    this.#expiry_data = data;
  }

  getData() {
    const exchange = this.getKey();
    const data = this.#expiry_data;
    const json = JSON.stringify({exchange,data});
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
