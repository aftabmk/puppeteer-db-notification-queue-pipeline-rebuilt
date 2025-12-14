// datastore.js
const { Page } = require('../index');

class DataStore {
  // singleton cache
  static #pageCache = new Map();

  static setPage(pageRegistry = {}) {
    for(let page of pageRegistry) {
      if (!page || typeof page.getKey !== 'function') {
        throw new Error('Invalid Page object: must have getKey() method.');
      }

      const key = page.getKey();
      
      this.#pageCache.set(key, page);
    }
  }

  static getPage(key) {
    return this.#pageCache.get(key) || null;
  }

  static hasPage(key) {
    return this.#pageCache.has(key);
  }

  static getAllPages() {
    return Array.from(this.#pageCache.values());
  }

  static removePage(key) {
    this.#pageCache.delete(key);
  }

  static clearAllPages() {
    this.#pageCache.clear();
  }
}

module.exports = { DataStore };
