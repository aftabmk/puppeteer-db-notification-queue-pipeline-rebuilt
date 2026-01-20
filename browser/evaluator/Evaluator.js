const { ContentType, Exchange} = require("../../types");
const { EvaluatorUtils } = require('./utils/EvaluatorUtils');
class Evaluator extends EvaluatorUtils {
  constructor(pageManager) {
    super(pageManager);
  }

  async buildHeaders(pageId) {
    if (!this.cookieManager) throw new Error("CookieManager not initialized via PageManager");

    let cookies = this.getCachedCookie(pageId);
    if (!cookies || cookies.length === 0) 
      cookies = await this.fetchCookie(pageId);
    
    const cookieHeader = cookies.map((c) => `${c.name}=${c.value}`).join("; ");

    const headers = this.getHeader(cookieHeader);
    console.log(headers);
    return headers;
  }

  async evaluateFetch(page, url, pageId, headers) {
    // debugger
    return await page.evaluate(this.fetchEval, { url, headers, pageId, ContentType, Exchange });
  }

  async attemptFetchWithRetry(pageId, url, maxAttempts = 3) {
    const page = this.pageManager.getPage(pageId);
    if (!page) throw new Error(`Page "${pageId}" not found`);

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      // console.log(`🧪 Attempt ${attempt} for ${url}`);

      const headers = await this.buildHeaders(pageId);
      const result = await this.evaluateFetch(page, url, pageId, headers);

      if (result.status === 200) {
        return result;
      }
      // ✅ Use PageManager’s built-in reload function
      await this.pageManager.reloadPage(pageId);
    }

    console.error(`❌ All ${maxAttempts} attempts failed for ${url}`);
    return { status: 400, data: [], message: "All retries failed" };
  }

  async fetchInsidePage(pageId, url) {
    const page = this.pageManager.getPage(pageId);
    if (!page) throw new Error(`Page "${pageId}" not found`);

    // console.log(` Fetching URL inside page "${pageId}": ${url}`);
    const result = await this.attemptFetchWithRetry(pageId, url, 3);
    return result;
  }
}

module.exports = { Evaluator };
