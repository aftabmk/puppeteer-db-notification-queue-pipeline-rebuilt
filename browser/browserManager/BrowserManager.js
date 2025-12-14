const { LOG } = require('./log');
const { BrowserManagerUtils } = require('./utils/BrowserManagerUtils');

class BrowserManager extends BrowserManagerUtils {
  constructor(puppeteer, chromium, isLambda) {
    super(puppeteer,chromium,isLambda);
  }

  async launch({ headless, devtools, args }) {
    let options = this.setOption(headless,devtools,args);
    await this.launchBrowser(options);

    LOG.LAUNCH(this.isLambda,headless);
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
      LOG.CLOSE;
    }
  }
}

module.exports = { BrowserManager };
