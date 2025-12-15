class EvaluatorUtils {
	constructor(pageManager) {
		this.pageManager = pageManager;
    	this.cookieManager = this.pageManager.cookieManager; 
	}

	getCachedCookie(pageId) {
		this.cookieManager.cookieStore.get(pageId)
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
}

module.exports = { EvaluatorUtils };