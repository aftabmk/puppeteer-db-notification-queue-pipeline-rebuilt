# 🍪 CookieManager — Function Summary

## 📄 Overview
`CookieManager` handles all cookie-related operations within a Puppeteer browser context.  
It manages fetching, setting, clearing, and caching cookies for different pages managed by `PageManager`.

Each page is identified by a `pageName`, and cookies are cached in-memory for quick retrieval.

---

## ⚙️ Constructor

### `constructor(context, pageManager)`
Initializes a new `CookieManager` instance with a given browser context and page manager.

**Parameters:**
| Name | Type | Description |
|------|------|-------------|
| `context` | `object` | Puppeteer `BrowserContext` instance |
| `pageManager` | `PageManager` | Page manager responsible for handling browser pages |

**Initializes:**
- `cookieStore` — A `Map` that stores cookies per page name (`pageName → cookies[]`)

---

## 🍪 Functions

### 🔹 `getCookies(pageName)`
Fetches cookies for a given page directly from the browser context and stores them in the internal cache.

**Behavior:**
- Retrieves active cookies from the browser context.
- Caches cookies in `cookieStore`.
- Logs the number of cookies fetched.

**Returns:**  
`Array` — List of cookies retrieved for the specified page.

---

### 🔹 `getHeader(pageName)`
Builds a ready-to-use HTTP `Cookie` header string from the current browser cookies.

**Behavior:**
- Ensures fresh cookies by calling `getCookies(pageName)`.
- Converts cookies into a formatted `name=value;` string.

**Returns:**  
`String` — Formatted cookie header.

---

### 🔹 `setCookies(pageName, cookies)`
Sets new cookies into the browser context and updates the internal cache.

**Behavior:**
- Accepts a single cookie or an array of cookies.
- Adds cookies to the current browser context.
- Updates `cookieStore` for the given page.

**Parameters:**
| Name | Type | Description |
|------|------|-------------|
| `pageName` | `string` | Name of the page to associate cookies with |
| `cookies` | `Array` or `Object` | Cookie(s) to set in the browser |

---

### 🔹 `clearCookies(pageName)`
Removes all cookies from both the browser context and the in-memory cache for a given page.

**Behavior:**
- Opens a Chrome DevTools Protocol (CDP) session for the page.
- Sends `Network.clearBrowserCookies` command.
- Removes cookies from `cookieStore`.

---

### 🔹 `getCached(pageName)`
Retrieves cached cookies from memory without calling the browser.

**Behavior:**
- Provides fast access to previously fetched cookies.
- Returns an empty array if no cookies are cached for the page.

**Returns:**  
`Array` — Cached cookies for the specified page.

---

### 🔹 `clearCache()`
Clears all cookies stored in the in-memory `cookieStore`.  
Does **not** affect browser cookies.

**Behavior:**
- Empties all cached cookie entries.
- Logs a confirmation message.

---

## 🧠 Properties Summary

| Property | Type | Description |
|-----------|------|-------------|
| `context` | `object` | Puppeteer browser context |
| `pageManager` | `PageManager` | Manages pages linked to cookies |
| `cookieStore` | `Map` | In-memory store mapping page names to cookies |

---

## 🧾 Summary

| Function | Purpose |
|-----------|----------|
| `getCookies()` | Fetch and cache cookies from browser |
| `getHeader()` | Build HTTP Cookie header |
| `setCookies()` | Add cookies to browser and cache |
| `clearCookies()` | Remove cookies from browser and cache |
| `getCached()` | Retrieve cached cookies (no browser call) |
| `clearCache()` | Wipe all in-memory cookie data |

---
