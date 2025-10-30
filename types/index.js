const { PageType_1, PageType_2 } = require('./page');

const ContentType = Object.freeze({
    HTTP : "http",
    COOKIE : "cookie",
    APPLICATION_JSON : "application/json",

})

const PageType = Object.freeze({
    PageType_1 : PageType_1, 
    PageType_2 : PageType_2, 
})

const PageParams = Object.freeze({
    EXCHANGE : "EXCHANGE",
    PAGE_URL : "PAGE_URL",
    API_URL : "API_URL",
})

const WaitUntil = Object.freeze({
  LOAD: "load",                    
  DOM_CONTENT_LOADED: "domcontentloaded", 
  NETWORK_IDLE_0: "networkidle0",  
  NETWORK_IDLE_2: "networkidle2"   
});

module.exports = { ContentType, PageType, PageParams, WaitUntil}