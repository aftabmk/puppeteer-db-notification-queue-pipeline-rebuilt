const Request = Object.freeze({
  HTML: "document",
  SCRIPT: "script",
  STYLESHEET: "stylesheet",
  IMAGE: "image",
  MEDIA: "media",
  FONT: "font",
  FETCH: "fetch",
  XHR: "xhr",
  WEBSOCKET: "websocket",
  WORKER: "worker",
  MANIFEST: "manifest",
  PING: "ping",
  PREFETCH: "prefetch",
  IFRAME: "iframe",
  OTHER: "other"
});

module.exports = { Request };
