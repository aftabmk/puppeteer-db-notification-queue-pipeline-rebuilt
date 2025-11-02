const zlib = require('zlib');

const main = () => {
  const encoded = "H4sIAAAAAAAACouOBQApu0wNAgAAAA=="
  const decoded = Buffer.from(encoded, 'base64');
  const decompressed = zlib.gunzipSync(decoded).toString('utf8');

  debugger;
}

main();