class Logger {
  static store = new Map();

  static format(ts) {
    return new Date(ts).toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
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
      _startTs: startTs,
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
    const entry = [...list].reverse().find((e) => e.fn === fnName && !e.end);
    if (!entry) return;

    entry.end = end;
    entry.duration = duration;

    // remove internal temp value
    delete entry._startTs;
  }

  static getStore() {
    return Logger.store;
  }

  static log() {
    console.log("=== LOGGER START ===\n");

    if (Logger.store.size === 0) {
      console.log("No logs available.");
      console.log("\n=== LOGGER END ===");
      return;
    }

    for (let [id, entries] of Logger.store) {
      console.log(`ID: ${id}`);
      console.log("=".repeat(40) + "LOGGER BEGIN" + "=".repeat(40));

      entries.forEach((entry, idx) => {
        const { start, end, duration } = entry;
        
        const startTime = Logger.getTime(start), endTime = Logger.getTime(end);

        console.log(
          `${idx + 1}. Function: ${entry.fn.padEnd(20
          )} | Start: ${startTime} | End: ${endTime} | Duration: ${duration}ms`
        );
      });

      console.log("-".repeat(100) + "\n");
    }

    console.log("=".repeat(40) + "LOGGER END" + "=".repeat(40));
  }

  static getTime(date) {
    const config = { hour: "2-digit", minute: "2-digit", hour12: true }; 
    return date.toLocaleString("en-US", config);
  }
};

module.exports = { Logger };
