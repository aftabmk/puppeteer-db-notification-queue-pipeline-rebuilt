const { BrowserManager } = require("../browserManager/BrowserManager");

class BrowserFactory {
  static isLambda = false;
  static puppeteer = null;
  static chromium = null;
  static manager = null;

  static async init() {
    if (this.puppeteer) return;

    this.isLambda = !!(
      process.env.AWS_EXECUTION_ENV || process.env.LAMBDA_TASK_ROOT
    );

    if (this.isLambda) {
      console.log("🚀 Lambda environment detected");
      
      const puppeteer = await import("puppeteer-core");
      const chromium = await import("@sparticuz/chromium");
      
      this.puppeteer = puppeteer.default;
      this.chromium = chromium.default;
    } 
    else {
      console.log("💻 Local environment detected");
      
      const puppeteer = require("puppeteer-extra");
      const StealthPlugin = require("puppeteer-extra-plugin-stealth");
      
      puppeteer.use(StealthPlugin());
      this.puppeteer = puppeteer;
    }
  }

  static async createManager(options = {}) {
    
    // If an existing manager is cached and browser still connected → reuse
    if (this.manager && this.manager.browser && this.manager.browser.isConnected()) 
      console.log("♻️ Reusing existing BrowserManager");
    else {
      // Ensure dependencies initialized
      await this.init();

      console.log("🚀 Creating new BrowserManager");   
      const manager = new BrowserManager(this.puppeteer,this.chromium,this.isLambda);
      
      await manager.launch(options);
      this.manager = manager;
    }

    // ✅ Always return the cached manager instance
    return this.manager;
  }
}

module.exports = { BrowserFactory };
