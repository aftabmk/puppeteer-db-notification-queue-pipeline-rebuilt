// Page.js
// const zlib = require("zlib");
const { PageUtils } = require("./utils/PageUtils");
const { compressJson } = require("./utils/utilFn");

class Page extends PageUtils {
  #isCached;
  #database;
  #expiry_url;
  #compressed;

  constructor(meta) {
    super(meta);

    this.#database = [];
    this.#expiry_url = [];
    this.#compressed = [];
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

  getISOString() {
    let time = new Date().getTime();
    let offSet = 5.5 * 60 * 60 * 1000;
    return new Date(time + offSet).toISOString();
  }

  getData() {
    const { EXCHANGE, TYPE } = this.getParams();
    const time = this.getISOString();
    const data = this.#database;

    // Construct payload
    const payload = { EXCHANGE, TYPE, data, time };
    const compressedData = compressJson(payload);
    // IMPORTANT: return raw binary Buffer
    this.#compressed = JSON.stringify(compressedData);

    return this.#compressed;
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
