const { PageManager } = require('../pageManager/PageManager');
const { CookieManager } = require('../cookieManager/CookieManager');
const { Evaluator } = require('../evaluator/Evaluator');
const { RequestInterceptor } = require('../interceptor/RequestInterceptor');

class BrowserManager {
  constructor(puppeteer, chromium, isLambda) {
    this.puppeteer = puppeteer;
    this.chromium = chromium;
    this.isLambda = isLambda;

    this.browser = null;
    this.context = null;
    this.pageManager = null;
    this.cookieManager = null;
    this.evaluator = null;
    this.interceptor = null; // ✅ Global request interceptor
  }

  async launch({ incognito = true, headless = true, devtools = false } = {}) {
    let options = {
      headless,
      devtools,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      defaultViewport: { width: 1366, height: 768 },
    };

    if (this.isLambda) {
      options = {
        args: this.chromium.args,
        executablePath: await this.chromium.executablePath(),
        headless: this.chromium.headless,
        defaultViewport: this.chromium.defaultViewport,
      };
    }

    this.browser = await this.puppeteer.launch(options);

    if (incognito && this.browser.createIncognitoBrowserContext) {
      this.context = await this.browser.createIncognitoBrowserContext();
      console.log('🕶️ Using incognito context');
    } else {
      this.context = this.browser.defaultBrowserContext();
      console.log('⚙️ Using default browser context');
    }

    // ✅ Initialize global interceptor
    this.interceptor = new RequestInterceptor({
      allowed: ['india.com'],
      disallowed: ["RealTime","js","xhr","css","png","gif","woff","jpg","ico","svg"]
    });

    // ✅ Initialize managers (order matters)
    this.cookieManager = new CookieManager(this.context);
    this.pageManager = new PageManager(this.context, this.cookieManager, this.interceptor);
    this.evaluator = new Evaluator(this.pageManager);

    console.log(
      `✅ Browser launched (${this.isLambda ? 'Lambda' : 'Local'} | ${
        incognito ? 'incognito' : 'default'
      } | ${headless ? 'headless' : 'headed'})`
    );
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
      console.log('🧩 Browser closed cleanly');
    }
  }
}

module.exports = { BrowserManager };
