// Page.js
const zlib = require("zlib");
const { PageUtils } = require("./utils/PageUtils");

class Page extends PageUtils {
  #isCached;
  #database;
  #expiry_url;

  constructor(meta) {
    super(meta);

    this.#database = [];
    this.#expiry_url = [];
    this.#isCached = false;
  }

  getKey() {
    const { EXCHANGE, TYPE } = this.getMeta();
    const KEY = EXCHANGE + "-" + TYPE;
    return KEY;
  }
  
  getParams() {
    // const { EXCHANGE, TYPE, PAGE_URL, API_URL } = this.getMeta();
    return this.getMeta();
  }

  buildUrl(data) {
    const urls = super.buildUrl(data);
    this.#expiry_url.push(...urls);
  }

  getExpiryUrl() {
    return [...this.#expiry_url];
  }

  insertArray(data) {
    this.#database = data;
  }

  getData() {
    const { EXCHANGE, TYPE } = this.getParams();
    const data = this.#database;

    const json = JSON.stringify({ EXCHANGE, TYPE, data });
    const compressed = zlib.gzipSync(json);

    return compressed.toString("base64");
  }

  clearExpiry() {
    this.#database = [];
  }

  isCached() {
    // isCached invoked if sns message is succesfull
    return this.#isCached;
  }

  setCache() {
    this.#isCached = true;
  }

  clearCache() {
    this.#isCached = false;
  }
}

module.exports = { Page };
