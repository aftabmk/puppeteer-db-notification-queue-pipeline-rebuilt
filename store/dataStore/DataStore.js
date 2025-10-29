
class DataStore {
  static cache = new Map();

  static get(key) {
    const { data } = this.cache.get(key);
    // debugger;
    return data;
  }

  static set(key,value,type = null) {
    this.cache.set(key, {  data : value, ts: Date.now(), type : type });
  }

  static clearExpired(ttl = 1000 * 60 * 5) {
    for (const [key, { ts }] of this.cache.entries()) {
      if (Date.now() - ts > ttl) this.cache.delete(key);
    }
  }
}

module.exports = { DataStore };
