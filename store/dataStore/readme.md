# 🗄️ DataStore — Function Summary

## 📘 Overview
`DataStore` is a lightweight in-memory caching utility for storing, retrieving, and managing data within an application runtime.  
It is designed to act as a simple key-value store with optional data typing and time-based cleanup.

All data is stored in a static `Map`, making it globally accessible without class instantiation.

---

## ⚙️ Static Properties

| Property | Type | Description |
|-----------|------|-------------|
| `cache` | `Map` | Stores key-value pairs in memory (`key → { data, ts, type }`) |

---

## 🧩 Functions

### 🔹 `get(key)`
Retrieves stored data for a specific key.

**Behavior:**
- Looks up the key in the internal cache.
- Returns the stored `data` associated with that key.
- If the key does not exist, returns `undefined`.

**Parameters:**
| Name | Type | Description |
|------|------|-------------|
| `key` | `string` | Identifier for the stored item |

**Returns:**  
Stored `data` value or `undefined` if not found.

---

### 🔹 `set(key, value, type = null)`
Stores data in the cache with an optional type label and timestamp.

**Behavior:**
- Saves the value along with:
  - `data`: actual value
  - `ts`: current timestamp
  - `type`: optional metadata describing the stored data type
- Overwrites existing entries for the same key.

**Parameters:**
| Name | Type | Default | Description |
|------|------|----------|-------------|
| `key` | `string` | — | Key under which to store the value |
| `value` | `any` | — | Data to store |
| `type` | `string \| null` | `null` | Optional tag to describe data format (e.g., "json", "string") |

---

### 🔹 `clearExpired(ttl = 1000 * 60 * 5)`
Removes entries that have exceeded a specified time-to-live (TTL).

**Behavior:**
- Iterates through all cache entries.
- Compares their timestamps (`ts`) against the current time.
- Deletes entries older than the specified TTL.

**Parameters:**
| Name | Type | Default | Description |
|------|------|----------|-------------|
| `ttl` | `number` | `300000 ms` (5 minutes) | Time-to-live duration for cache entries |

---

## 🧠 Data Structure

Each entry in the cache is stored as an object:
