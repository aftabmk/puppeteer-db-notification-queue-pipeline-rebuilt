class BrowserFactoryUtils {
  // 🛡️ Private fields
  static isLambda = false;
  static puppeteer = null;
  static chromium = null;
  static manager = null;

  static setEnvironment() {
    this.isLambda = !!(process.env.AWS_EXECUTION_ENV);

	switch(this.isLambda) {
		case true : {
			this.setLambdaEnvironment();
			break;
		}

		default : {
			this.setLocalEnvironment();
			break;
		}
	}
  }
  static setLambdaEnvironment() {
      console.log("🚀 Lambda environment detected");
      const puppeteer = require("puppeteer-core");
      const StealthPlugin = require("puppeteer-extra-plugin-stealth");
      const chromium = require("@sparticuz/chromium");
      
      puppeteer.use(StealthPlugin());
	    this.puppeteer = puppeteer.default;
      this.chromium = chromium;
  }

  static setLocalEnvironment() {
      console.log("💻 Local environment detected");
      const puppeteer = require("puppeteer-extra");
      const StealthPlugin = require("puppeteer-extra-plugin-stealth");
      
	    puppeteer.use(StealthPlugin());
      this.puppeteer = puppeteer;
  }
}

module.exports = { BrowserFactoryUtils };
