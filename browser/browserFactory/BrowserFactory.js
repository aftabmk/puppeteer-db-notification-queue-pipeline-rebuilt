const { BrowserManager } = require("../browserManager/BrowserManager");

class BrowserFactory {
  // 🛡️ Private fields
  static #isLambda = false;
  static #puppeteer = null;
  static #chromium = null;
  static #manager = null;

  // 🛠️ Protected (internal-use) initializer
  static async #init() {
    if (this.#puppeteer) return;

    this.#isLambda = !!(process.env.AWS_EXECUTION_ENV);

    if (this.#isLambda) {
      console.log("🚀 Lambda environment detected");
      const puppeteer = await import("puppeteer-core");
      const chromium = await import("@sparticuz/chromium");
      this.#puppeteer = puppeteer.default;
      this.#chromium = chromium.default;
    } else {
      console.log("💻 Local environment detected");
      const puppeteer = require("puppeteer-extra");
      const StealthPlugin = require("puppeteer-extra-plugin-stealth");
      puppeteer.use(StealthPlugin());
      this.#puppeteer = puppeteer;
    }
  }

  // ⚙️ Protected (internal) manager creator
  static async #createManager(options = {}) {
    await this.#init();
    // console.log("🚀 Creating new BrowserManager");

    const manager = new BrowserManager(this.#puppeteer, this.#chromium, this.#isLambda);
    await manager.launch(options);

    this.#manager = manager;
  }

  // ✅ Public accessor: safely returns (or creates) BrowserManager
  static async getManager(options = {}) {
    if (this.#manager && this.#manager.browser && this.#manager.browser.isConnected()) {
      // console.log("♻️ Reusing existing BrowserManager");
      return this.#manager;
    }

    // console.log("⚙️ No active manager found — creating new one");
    await this.#createManager(options);
    return this.#manager;
  }
}

module.exports = { BrowserFactory };
