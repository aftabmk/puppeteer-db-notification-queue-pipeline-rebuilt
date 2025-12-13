const { Logger } = require("../../logger/Logger");
class WorkFlowUtils {
  constructor(manager, page) {
    this.page = page;
    this.manager = manager;
    
    this._logId = "";
  }

  _bindLogging() {
    const methods = this._filterMethods();

    for (const method of methods) {
      const original = this[method].bind(this);

      this[method] = async (...args) => {
        const start = Logger.start(this._logId, method);
        try {
          return await original(...args);
        } finally {
          Logger.end(this._logId, method, start);
        }
      };
    }
  }

  _filterMethods() {
    const allMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
    const publicMethods = allMethods.filter(
      (method) =>
        method !== "constructor" &&
        typeof this[method] === "function" &&
        !method.startsWith("_")
    );
    return publicMethods;
  }
}

module.exports = { WorkFlowUtils };
