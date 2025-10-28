// CookieManager.js
class CookieManager {
  constructor(context) {
    this.context = context;
    this.cookieStore = new Map(); // pageName → cookies[]
  }

  async collectCookies(pageName) {
    const cookies = await this.context.cookies();
    this.cookieStore.set(pageName, cookies);
    console.log(`🍪 Collected ${cookies.length} cookies for "${pageName}"`);
    return cookies;
  }

  async clearCookies(pageName) {
    this.cookieStore.delete(pageName);
    console.log(`🧹 Cleared cookie cache for "${pageName}"`);
  }

  async getCookies(pageName) {
    return this.cookieStore.get(pageName) || [];
  }

  async getHeader(pageName) {
    const cookies = await this.getCookies(pageName);
    return cookies.map(c => `${c.name}=${c.value}`).join('; ');
  }

  async setCookies(pageName, cookies) {
    if (!Array.isArray(cookies)) cookies = [cookies];
    await this.context.addCookies(cookies);
    this.cookieStore.set(pageName, cookies);
    console.log(`⚙️ Set ${cookies.length} cookies for "${pageName}"`);
  }

  clearAll() {
    this.cookieStore.clear();
    console.log('🗑️ All in-memory cookie caches cleared');
  }
}

module.exports = { CookieManager };
