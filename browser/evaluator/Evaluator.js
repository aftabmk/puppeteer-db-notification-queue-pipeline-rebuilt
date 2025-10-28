class Evaluator {
  constructor(pageManager) {
    this.pageManager = pageManager;
    this.cookieManager = this.pageManager.cookieManager; // ✅ direct link
  }

  async buildHeaders(pageName) {
    if (!this.cookieManager)
      throw new Error('CookieManager not initialized via PageManager');

    let cookies = this.cookieManager.cookieStore.get(pageName);
    if (!cookies || cookies.length === 0) {
      console.log(`⚙️ No cookies cached for "${pageName}". Fetching from browser...`);
      cookies = await this.cookieManager.getCookies(pageName);
    }

    const cookieHeader = cookies.map(c => `${c.name}=${c.value}`).join('; ');

    const headers = {
      Accept: "application/json, text/plain, */*",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      Referer: "https://www.nseindia.com/",
      "Accept-Encoding": "gzip, deflate, br",
      Connection: "keep-alive",
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    };

    console.log(`🔖 Built headers for "${pageName}" (cookies: ${cookies.length})`);
    return headers;
  }

  async evaluateFetch(page, url, headers) {
    return await page.evaluate(async ({ url, headers }) => {
      try {
        const res = await fetch(url, { headers, credentials: "include" });
        const contentType = res.headers.get("content-type") || "";

        if (!contentType.includes("application/json")) {
          return {
            status: 400,
            data: [],
            message: `Unexpected content-type: ${contentType}`,
          };
        }

        const data = await res.json();
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        return { status: 200, data, message: "Success" };
      } catch (err) {
        return {
          status: 400,
          data: [],
          message: err.message || "Unexpected error",
        };
      }
    }, { url, headers });
  }

  async attemptFetchWithRetry(pageName, url, maxAttempts = 3) {
    const page = this.pageManager.getPage(pageName);
    if (!page) throw new Error(`Page "${pageName}" not found`);

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      console.log(`🧪 Attempt ${attempt} for ${url}`);

      const headers = await this.buildHeaders(pageName);
      const result = await this.evaluateFetch(page, url, headers);

      if (result.status === 200) {
        console.log(`✅ Fetch succeeded on attempt ${attempt}`);
        return result;
      }

      console.warn(`⚠️ Attempt ${attempt} failed: ${result.message}`);

      // ✅ Use PageManager’s built-in reload function
      await this.pageManager.reloadPage(pageName);
    }

    console.error(`❌ All ${maxAttempts} attempts failed for ${url}`);
    return { status: 400, data: [], message: "All retries failed" };
  }

  async fetchInsidePage(pageName, url) {
    const page = this.pageManager.getPage(pageName);
    if (!page) throw new Error(`Page "${pageName}" not found`);

    console.log(`🌐 Fetching URL inside page "${pageName}": ${url}`);
    const result = await this.attemptFetchWithRetry(pageName, url, 3);

    if (result.status === 200)
      console.log(`✅ Fetch successful: ${url}`);
    else
      console.error(`❌ Fetch failed: ${url} - ${result.message}`);

    return result;
  }
}

module.exports = { Evaluator };
