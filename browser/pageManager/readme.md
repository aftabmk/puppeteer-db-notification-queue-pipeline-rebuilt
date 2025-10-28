# 📄 PageManager — Function Summary

## 📘 Overview
`PageManager` is responsible for creating, tracking, and managing multiple Puppeteer pages within a browser context.  
It provides a structured way to open, retrieve, reload, and close pages identified by custom names.

---

## ⚙️ Constructor

### `constructor(context)`
Initializes a new `PageManager` with the given Puppeteer browser context.

**Parameters:**
| Name | Type | Description |
|------|------|-------------|
| `context` | `BrowserContext` | Puppeteer browser context used to create new pages |

**Initializes:**
- `pages` — A `Map` that stores pages by name (`pageName → page`)

---

## 🧩 Functions

### 🆕 `newPage(name)`
Creates a new browser page inside the current context and assigns it a unique name.

**Behavior:**
- Opens a new Puppeteer page.
- Stores it in the internal `pages` map under the provided name.

**Parameters:**
| Name | Type | Description |
|------|------|-------------|
| `name` | `string` | Identifier for the newly created page |

**Returns:**  
`Page` — The created Puppeteer page instance.

---

### 🔍 `getPage(name)`
Retrieves an existing page by its name.

**Behavior:**
- Looks up the page from the internal `pages` map.
- Returns `undefined` if no page exists for the name.

**Returns:**  
`Page` — The Puppeteer page instance, if found.

---

### ♻️ `reloadPage(name)`
Reloads a specific page by name, waiting for the DOM to load completely.

**Behavior:**
- Finds the page in the map.
- Reloads it using Puppeteer's built-in reload mechanism.
- Uses `waitUntil: 'domcontentloaded'` to ensure content readiness.

---

### ❌ `deletePage(name)`
Closes and removes a page from the internal map.

**Behavior:**
- Finds the page by name.
- Closes the Puppeteer page.
- Deletes its entry from the `pages` map.

---

## 🧠 Properties Summary

| Property | Type | Description |
|-----------|------|-------------|
| `context` | `BrowserContext` | Puppeteer context for managing pages |
| `pages` | `Map` | Stores page instances by name |

---

## 🧾 Summary

| Function | Purpose |
|-----------|----------|
| `newPage()` | Create and register a new page |
| `getPage()` | Retrieve an existing page by name |
| `reloadPage()` | Reload a page to refresh its content |
| `deletePage()` | Close and remove a page from memory |

---
