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

  async launch({ headless, devtools, args }) {
    
    let options = {
      headless,
      devtools,
      args,
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
    this.context = this.browser.defaultBrowserContext();

    this.interceptor = new RequestInterceptor();
    this.cookieManager = new CookieManager(this.context);

    this.pageManager = new PageManager(this.context, this.cookieManager, this.interceptor);
    this.evaluator = new Evaluator(this.pageManager);

    console.log(`✅ Browser launched (${this.isLambda ? 'Lambda' : 'Local'} | ${headless ? 'headless' : 'headed'})`);
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
      console.log('🧩 Browser closed cleanly');
    }
  }
}

module.exports = { BrowserManager };
