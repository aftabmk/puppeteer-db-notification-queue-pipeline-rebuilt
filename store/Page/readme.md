# 📘 Page Class Documentation

## Overview
The `Page` class manages exchange-specific metadata, constructs expiry URLs, and organizes expiry-related data into JSON format.  
It is designed to support multiple exchanges, each with its own URL-building logic.

---

## 🧩 Class: `Page`

### 🔒 Private Variables
| Variable | Type | Description |
|-----------|------|--------------|
| `meta` | `Object` | Contains metadata for the current exchange (e.g., exchange name, API URL builder). |
| `expiry_data` | `Array` | Stores all expiry-related data values inserted into the class. |
| `expiry_url` | `Array` | Holds URLs generated from the expiry data. |

---

### ⚙️ Constructor
#### `constructor(page)`
- **Parameters**
  - `page` *(Object)* → An object holding exchange metadata and configuration.
- **Description**
  - Initializes the internal metadata, expiry data, and expiry URL arrays.

---

## 🚀 Public Methods

### `buildUrl(data)`
- **Parameters**
  - `data` *(Array)* → A list of expiry dates or identifiers.
- **Description**
  - Determines which exchange is active and calls the corresponding private URL builder method.

---

### `getExpiryUrl()`
- **Returns**
  - *(Array)* → A list of all generated expiry URLs.
- **Description**
  - Provides a copy of the internally built expiry URLs.

---

### `insertArray(data)`
- **Parameters**
  - `data` *(Array)* → A collection of expiry-related values.
- **Description**
  - Adds the provided values to the internal expiry data array.

---

### `getJSONData()`
- **Returns**
  - *(String)* → A JSON string representation of all stored expiry data.
- **Description**
  - Converts the internal expiry data array into a JSON-formatted string.

---

## 🔒 Private Methods

### `buildUrlExchangeOne(data)`
- **Parameters**
  - `data` *(Array)* → A list of expiry dates or identifiers.
- **Description**
  - Builds expiry URLs for the first exchange type based on the provided data.

---

### `buildUrlExchangeTwo(data)`
- **Parameters**
  - `data` *(Array)* → A list of expiry dates or identifiers.
- **Description**
  - Builds expiry URLs for the second exchange type based on the provided data.

---

## 🧠 Notes
- Private members (`meta`, `expiry_data`, `expiry_url`) are not accessible from outside the class.
- The `buildUrl` method automatically selects the appropriate private builder function based on the exchange defined in metadata.
- The class is designed for modular expansion — new exchanges can be added by defining additional private builder methods.

---
