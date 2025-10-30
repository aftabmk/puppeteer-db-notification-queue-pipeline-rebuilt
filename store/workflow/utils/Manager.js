const { BrowserFactory } = require("../../../browser");

class Manager {
  constructor() {
    this.manager = null;
  }

  async #initManager() {
    this.manager = await BrowserFactory.getManager({
      incognito: true,
      headless: false,
      devtools: true,
    });
  }
}

module.exports = { Manager };
