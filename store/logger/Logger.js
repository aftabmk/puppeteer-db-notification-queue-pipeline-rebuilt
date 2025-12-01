// logger.js
class Logger {
  // store: key = "EXCHANGE-TYPE", value = [ { fn, start, end, duration } ]
  static store = new Map();

  // Format time to "hh:mm am/pm"
  static format(ts) {
    return new Date(ts).toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true
    });
  }

  static start(id, fnName) {
    const startTs = Date.now();
    const start = Logger.format(startTs);

    if (!Logger.store.has(id)) Logger.store.set(id, []);

    // push temporary entry with no end yet
    Logger.store.get(id).push({
      fn: fnName,
      start,
      _startTs: startTs
    });

    return startTs;
  }

  static end(id, fnName, startTs) {
    const endTs = Date.now();
    const end = Logger.format(endTs);
    const duration = endTs - startTs;

    const list = Logger.store.get(id);
    if (!list) return;

    // find the last entry with this fn and no end set yet
    const entry = [...list].reverse().find(e => e.fn === fnName && !e.end);
    if (!entry) return;

    entry.end = end;
    entry.duration = duration;

    // remove internal temp value
    delete entry._startTs;
  }

  static getStore() {
    return Logger.store;
  }
}

module.exports = { Logger };
