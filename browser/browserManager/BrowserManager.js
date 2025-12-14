const { BrowserManagerUtils } = require('./utils/BrowserManagerUtils');

class BrowserManager extends BrowserManagerUtils {
  constructor(puppeteer, chromium, isLambda) {
    super(puppeteer,chromium,isLambda);
  }

  async launch({ headless, devtools, args }) {
    let options = this.setOption(headless,devtools,args);
    await this.launchBrowser(options);
    
    console.log(`✅ Browser launched (${this.isLambda ? 'Lambda' : 'Local'} | ${headless ? 'headless' : 'head'})`);
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
      console.log('🧩 Browser closed cleanly');
    }
  }
}

module.exports = { BrowserManager };
