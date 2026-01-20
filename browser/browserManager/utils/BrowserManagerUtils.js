const { ViewPort } = require("../../../types");
const { Evaluator } = require('../../evaluator/Evaluator');
const { PageManager } = require('../../pageManager/PageManager');
const { CookieManager } = require('../../cookieManager/CookieManager');
const { RequestInterceptor } = require('../../interceptor/RequestInterceptor');

class BrowserManagerUtils {
  constructor(puppeteer, chromium, isLambda) {
    this.puppeteer = puppeteer;
    this.chromium = chromium;
    this.isLambda = isLambda;

    this.browser = null;
    this.context = null;
    this.pageManager = null;
    this.cookieManager = null;
    this.evaluator = null;
    this.interceptor = null;
  }

  async setOption(headless, devtools, args) {
    let options;
    switch (this.isLambda) {
      case true: {
        options = {
          args: this.chromium.args,
          executablePath: await this.chromium.executablePath(),
          headless: "new",
        };

        break;
      }

      case false : {
        options = {
          headless,
          devtools,
          args,
          defaultViewport: { width: ViewPort.Width, height: ViewPort.Height },
        };

        break;
      }

      default : {
        options = '';
        console.log("setoption failed");
      }
    }

    return options;
  }
  async launchBrowser(options) {
    this.browser = await this.puppeteer.launch(options);
    this.context = this.browser.defaultBrowserContext();

    this.interceptor = new RequestInterceptor();
    this.cookieManager = new CookieManager(this.context);

    this.pageManager = new PageManager(this.context, this.cookieManager, this.interceptor);
    this.evaluator = new Evaluator(this.pageManager);
  }
}

module.exports = { BrowserManagerUtils };
