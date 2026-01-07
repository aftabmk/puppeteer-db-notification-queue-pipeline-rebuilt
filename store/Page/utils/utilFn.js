const zlib = require("zlib");

function compressJson(jsonData) {
  const jsonString =
    typeof jsonData === "string"
      ? jsonData
      : JSON.stringify(jsonData);

  return zlib.gzipSync(jsonString, { level: 9 });
}

module.exports = { compressJson };
