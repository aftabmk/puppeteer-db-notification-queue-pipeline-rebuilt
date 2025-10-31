class PageManager {
  constructor(context, cookieManager, interceptor) {
    this.context = context;
    this.cookieManager = cookieManager;
    this.interceptor = interceptor;
    this.pages = new Map();
  }

  /**
   * Create a new page and attach interceptor & cookies.
   */
  async newPage(name) {
    const page = await this.context.newPage();
    
    if (this.interceptor) await this.interceptor.attach(page);
    this.pages.set(name, page);

    // collect cookies immediately after opening
    if (this.cookieManager) {
      await this.cookieManager.getCookies(name);
    }

    return page;
  }

  /**
   * Get an existing page by name.
   */
  getPage(name) {
    const page = this.pages.get(name);
    if (!page) throw new Error(`Page "${name}" not found`);
    return page;
  }

  /**
   * Reload page and refresh cookies.
   */
  async reloadPage(name) {
    const page = this.pages.get(name);
    if (!page) return;

    await page.reload({ waitUntil: 'domcontentloaded' });

    // refresh cookies after reload
    if (this.cookieManager) {
      await this.cookieManager.getCookies(name);
    }

    console.log(`🔄 Reloaded page "${name}"`);
  }

  /**
   * Delete a page safely and detach interceptor.
   */
  async deletePage(name) {
    const page = this.pages.get(name);
    if (!page) return;

    if (this.interceptor) await this.interceptor.detach(page);

    await page.close();
    this.pages.delete(name);
  }
}

module.exports = { PageManager };
