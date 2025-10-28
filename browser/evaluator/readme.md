# 🧮 Evaluator — Function Summary

## 📄 Overview
`Evaluator` is responsible for performing authenticated data fetching inside a Puppeteer browser page.  
It coordinates with the `PageManager` and `CookieManager` to build headers, execute `fetch` requests within the browser context, and automatically retry failed requests.

---

## ⚙️ Constructor

### `constructor(pageManager, cookieManager)`
Initializes an `Evaluator` instance with references to page and cookie management modules.

**Parameters:**
| Name | Type | Description |
|------|------|-------------|
| `pageManager` | `PageManager` | Handles browser pages used for fetch operations |
| `cookieManager` | `CookieManager` | Provides cookies and header management for authenticated requests |

---

## 🔹 Functions

### 🧾 `buildHeaders(pageName)`
Builds HTTP request headers for a given page, automatically including valid cookies.

**Behavior:**
- Fetches cookies from cache or browser using `CookieManager`.
- Constructs standard browser-like headers.
- Adds a `Cookie` header if cookies are available.

**Returns:**  
`Object` — HTTP headers with user-agent, referer, and cookies.

---

### 🌐 `evaluateFetch(page, url, headers)`
Executes a `fetch()` request **inside the browser context** to simulate a real client request.

**Behavior:**
- Runs a page-side `fetch()` call using `page.evaluate`.
- Validates content type and HTTP response.
- Returns structured response data and status.

**Returns:**  
`Object` — `{ status, data, message }`

**Status Codes:**
| Code | Meaning |
|------|----------|
| `200` | Success — JSON response received |
| `400` | Failed — Non-JSON response or fetch error |

---

### 🔁 `attemptFetchWithRetry(pageName, url, maxAttempts = 3)`
Attempts a fetch operation multiple times with automatic cookie refresh and page reloads.

**Behavior:**
- Tries up to `maxAttempts` times.
- On each failure:
  - Reloads the page.
  - Refreshes cookies.
- Stops early if fetch succeeds.

**Parameters:**
| Name | Type | Default | Description |
|------|------|----------|-------------|
| `pageName` | `string` | — | Name of the target page |
| `url` | `string` | — | Target URL for fetch |
| `maxAttempts` | `number` | `3` | Maximum retry attempts |

**Returns:**  
`Object` — Final fetch result after success or all retries failed.

---

### 🌍 `fetchInsidePage(pageName, url)`
Main entry point to perform a network fetch inside a browser page.

**Behavior:**
- Retrieves the page instance using `PageManager`.
- Logs the fetch operation.
- Delegates to `attemptFetchWithRetry` for reliability.
- Returns final response data.

**Returns:**  
`Object` — `{ status, data, message }`

---

## 🧠 Properties Summary

| Property | Type | Description |
|-----------|------|-------------|
| `pageManager` | `PageManager` | Handles Puppeteer page lifecycle |
| `cookieManager` | `CookieManager` | Manages cookies and headers for fetch requests |

---

## 🧾 Summary

| Function | Purpose |
|-----------|----------|
| `buildHeaders()` | Builds browser-like HTTP headers with cookies |
| `evaluateFetch()` | Performs a fetch request inside the browser page |
| `attemptFetchWithRetry()` | Retries failed fetches with page reloads and cookie updates |
| `fetchInsidePage()` | Public entry point for performing internal page fetches |

---
