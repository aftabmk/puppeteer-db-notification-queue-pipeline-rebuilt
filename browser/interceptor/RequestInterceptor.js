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
    page.on('request', handler);

    page._interceptionSet = true;
  }

  async detach(page) {
    if (!page || !page._interceptionSet) return;

    try {
      page.off('request', page._requestInterceptorHandler);
      page._interceptionSet = false;
      page._requestInterceptorHandler = null;
    } 
    catch {
        // ignore if already detached
        console.log("already detached")
    }
  }

  #handleRequest(req) {
    const url = req.url();
    const isAllowed = this.allowed.length === 0 || this.allowed.some(d => url.includes(d));
    const isBlocked = this.disallowed.some(d => url.includes(d));

    if (!isAllowed || isBlocked) req.abort();
    else req.continue();
  }

  updateFilter({ allowed, disallowed } = {}) {
    if (allowed) this.allowed = allowed;
    if (disallowed) this.disallowed = disallowed;
  }
}

module.exports = { RequestInterceptor };
