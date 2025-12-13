const Request = Object.freeze({
  HTML        : "document",
  SCRIPT      : "script",
  STYLESHEET  : "stylesheet",
  IMAGE       : "image",
  MEDIA       : "media",
  FONT        : "font",
  FETCH       : "fetch",
  XHR         : "xhr",
  WEBSOCKET   : "websocket",
  WORKER      : "worker",
  MANIFEST    : "manifest",
  PING        : "ping",
  PREFETCH    : "prefetch",
  IFRAME      : "iframe",
  OTHER       : "other"
});

const ContentType = Object.freeze({
    HTTP                : "http",
    COOKIE              : "cookie",
    APPLICATION_JSON    : "application/json",
})

const WaitUntil = Object.freeze({
  LOAD              : "load",                    
  NETWORK_IDLE_0    : "networkidle0",  
  NETWORK_IDLE_2    : "networkidle2",
  DOM_CONTENT_LOADED: "domcontentloaded",
});

module.exports = { Request, ContentType, WaitUntil};
