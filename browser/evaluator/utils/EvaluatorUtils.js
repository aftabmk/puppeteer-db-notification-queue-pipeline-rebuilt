class EvaluatorUtils {
  constructor(pageManager) {
    this.pageManager = pageManager;
    this.cookieManager = this.pageManager.cookieManager;
  }

  getCachedCookie(pageId) {
    this.cookieManager.cookieStore.get(pageId);
  }

  fetchCookie(pageId) {
    return this.cookieManager.getCookies(pageId);
  }

  getHeader(cookieHeader) {
    const header = {
      Accept: "application/json, text/plain, */*",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      Referer: process.env.REFERER_1,
      "Accept-Encoding": "gzip, deflate, br",
      Connection: "keep-alive",
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    };

    return header;
  }

  async fetchEval({ url, headers, pageId, ContentType, Exchange }) {
	// fetch the responce
    async function fetchResponse(pageId, url, headers) {
      let response;
      const [EXCHANGE] = pageId.split("-");

      switch (EXCHANGE) {
        case Exchange.EXCHANGE_1: {
          response = await fetch(url, { headers, credentials: "include" });
          break;
        }
        case Exchange.EXCHANGE_2: {
          response = await fetch(url);
          break;
        }
        default: {
          console.warn("The exchange input doest satisfy 'Exchange Type', exchange : %s", exchange);
          response = "";
          break;
        }
      }

      return response;
    }

	// 
    try {
      let response = await fetchResponse(pageId, url, headers);
      const contentType = response.headers.get("content-type") || "";

      if (!contentType.includes(ContentType.APPLICATION_JSON)) {
        return {
          status: 400,
          data: [],
          message: `Unexpected content-type: ${contentType}`,
        };
      }

      const data = await response.json();
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      // debugger
      return { status: 200, data, message: "Success" };
    } catch (err) {
      return {
        status: 400,
        data: [],
        message: err.message || "Unexpected error",
      };
    }
  }
}

module.exports = { EvaluatorUtils };
