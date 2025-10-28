# 🧭 BrowserManager — Function Summary

## 📄 Overview
`BrowserManager` is responsible for launching, managing, and closing Puppeteer browser instances.  
It serves as the core controller that integrates `PageManager`, `CookieManager`, and `Evaluator` to manage browser contexts, pages, cookies, and in-browser data operations.

---

## ⚙️ Constructor

### `constructor(puppeteer, chromium, isLambda)`
Initializes a new `BrowserManager` instance with references to Puppeteer and Chromium.

**Parameters:**
| Name | Type | Description |
|------|------|-------------|
| `puppeteer` | `object` | Puppeteer or Puppeteer-core instance |
| `chromium` | `object` | Chromium instance (for AWS Lambda) |
| `isLambda` | `boolean` | Indicates whether running in AWS Lambda |

**Initializes:**
- `browser`: Puppeteer browser instance (null initially)
- `context`: Browser context (incognito or default)
- `pageManager`: Manages pages inside the browser
- `cookieManager`: Handles browser cookies
- `evaluator`: Executes data operations inside pages

---

## 🧩 Functions

### 🚀 `launch({ incognito = true, headless = true, devtools = false } = {})`
Launches the Puppeteer browser with provided options and initializes managers.

**Key Responsibilities:**
- Builds launch options depending on environment (local or Lambda)
- Starts a new browser session
- Creates either **incognito** or **default** browser context
- Initializes:
  - `PageManager`
  - `CookieManager`
  - `Evaluator`

**Parameters:**
| Name | Type | Default | Description |
|------|------|----------|-------------|
| `incognito` | `boolean` | `true` | Launch browser in incognito mode |
| `headless` | `boolean` | `true` | Run in headless mode |
| `devtools` | `boolean` | `false` | Enable DevTools during launch |

**Logs:**
Indicates environment (Lambda or Local), context type, and browser mode.

---

### 🧹 `close()`
Closes the active Puppeteer browser instance and cleans up resources.

**Behavior:**
- Gracefully terminates all pages and contexts
- Logs confirmation when the browser is closed cleanly

---

## 🧠 Properties Summary

| Property | Type | Description |
|-----------|------|-------------|
| `puppeteer` | `object` | Puppeteer instance |
| `chromium` | `object` | Chromium instance (Lambda only) |
| `isLambda` | `boolean` | True if running in AWS Lambda |
| `browser` | `object` | Active Puppeteer browser instance |
| `context` | `object` | Browser context (incognito or default) |
| `pageManager` | `PageManager` | Controls creation and retrieval of pages |
| `cookieManager` | `CookieManager` | Manages cookies for pages and contexts |
| `evaluator` | `Evaluator` | Handles evaluation and data fetching inside browser pages |

---

## 🧾 Summary

| Function | Purpose |
|-----------|----------|
| `constructor()` | Initializes core browser components |
| `launch()` | Starts the browser and prepares managers |
| `close()` | Safely closes the browser session |

---
