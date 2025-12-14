const { Request } = require('../../types');

class RequestInterceptor {
  constructor({ allowed = [], disallowed = [] } = {}) {
    this.allowed = allowed;
    this.disallowed = disallowed;
  }

  async attach(page) {
    if (page._interceptionSet) return;

    await page.setRequestInterception(true);

    const handler = (req) => this.#handleRequest(req);
    page._requestInterceptorHandler = handler;
    page.on("request", handler);

    page._interceptionSet = true;
  }

  async detach(page) {
    if (!page || !page._interceptionSet) return;

    try {
      // await page.setJavaScriptEnabled(true);
      page.off("request", page._requestInterceptorHandler);
      page._interceptionSet = false;
      page._requestInterceptorHandler = null;
    } catch {
      // ignore if already detached
      console.log("already detached");
    }
  }

  async #handleRequest(req) {
    const type = req.resourceType();
    // const blockedTypes = []; 
    const blockedTypes = [Request.STYLESHEET,Request.IMAGE,Request.FONT,Request.SCRIPT,Request.XHR]; 
    
    if (blockedTypes.includes(type)) 
      await req.abort("blockedbyclient");
    else 
      await req.continue();
  }
  
  updateFilter({ allowed, disallowed } = {}) {
    if (allowed) this.allowed = allowed;
    if (disallowed) this.disallowed = disallowed;
  }
}

module.exports = { RequestInterceptor };
