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



module.exports = { ContentType, PageType }