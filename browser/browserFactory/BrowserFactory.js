const { BrowserManager } = require("../browserManager/BrowserManager");
const { BrowserFactoryUtils } = require('./utils/BrowserFactoryUtils');
class BrowserFactory extends BrowserFactoryUtils {
  static async init() {
    if (this.puppeteer) return;
    this.setEnvironment();
  }

  static async createManager(options = {}) {
    // "🚀 Creating new BrowserManager";
    await this.init();

    const manager = new BrowserManager(this.puppeteer, this.chromium, this.isLambda);
    await manager.launch(options);

    this.manager = manager;
  }

  static async getManager(options = {}) {
    // "♻️ Reusing existing BrowserManager";
    if (this.manager && this.manager.browser && this.manager.browser.isConnected()) 
      return this.manager;

    // ⚙️ No active manager found — creating new one;
    await this.createManager(options);
    return this.manager;
  }
}

module.exports = { BrowserFactory };
