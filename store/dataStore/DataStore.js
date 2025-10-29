// datastore.js

class DataStore {
  // singleton cache
  static #pageCache = new Map();

  static set(page) {
    if (!page || typeof page.getKey !== 'function') {
      throw new Error('Invalid Page object: must have getKey() method.');
    }
    const key = page.getKey();
    this.#pageCache.set(key, page);
  }

  static get(key) {
    return this.#pageCache.get(key) || null;
  }

  static has(key) {
    return this.#pageCache.has(key);
  }

  static getAll() {
    return Array.from(this.#pageCache.values());
  }

  static remove(key) {
    this.#pageCache.delete(key);
  }

  static clear() {
    this.#pageCache.clear();
  }
}

module.exports = { DataStore };
