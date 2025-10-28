# 🧭 BrowserFactory — Function Summary

## 📄 Overview
`BrowserFactory` is a static utility class that manages Puppeteer initialization and browser creation.  
It automatically detects whether the code is running **locally** or on **AWS Lambda** and configures the environment accordingly.

---

## ⚙️ Functions

### 🧩 `init()`
- Initializes Puppeteer depending on the environment.
- Detects if running on AWS Lambda using:
  - `process.env.AWS_EXECUTION_ENV`
  - `process.env.LAMBDA_TASK_ROOT`
- Loads:
  - `puppeteer-extra` with `stealth` plugin (local)
  - `puppeteer-core` + `@sparticuz/chromium` (Lambda)
- Ensures Puppeteer is only initialized once.

---

### 🚀 `createManager(options = {})`
- Ensures Puppeteer is initialized by calling `init()`.
- Creates a new instance of `BrowserManager` with the proper Puppeteer configuration.
- Launches the browser with the provided `options`.
- Returns the initialized `BrowserManager` instance.

**Parameters:**
| Name | Type | Default | Description |
|------|------|----------|-------------|
| `options` | `object` | `{}` | Browser launch configuration (headless, incognito, args, etc.) |

**Returns:**  
`BrowserManager` — ready-to-use browser management instance.

---

## 🧠 Static Properties

| Property | Type | Description |
|-----------|------|-------------|
| `isLambda` | `boolean` | Indicates if running inside AWS Lambda |
| `puppeteer` | `object` | Reference to Puppeteer or Puppeteer-core instance |
| `chromium` | `object` | Reference to Chromium (Lambda only) |

---

## 🧾 Summary

| Function | Purpose |
|-----------|----------|
| `init()` | Sets up Puppeteer environment (local or Lambda) |
| `createManager(options)` | Creates and launches a `BrowserManager` instance |
| `isLambda` | Boolean flag for environment detection |
| `puppeteer` | Holds Puppeteer instance |
| `chromium` | Holds Chromium instance (Lambda only) |

---
