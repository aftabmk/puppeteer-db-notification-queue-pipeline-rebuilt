const { DataTypes } = require('./data');
const { 
    EXCHANGE_1, PAGE_URL_1, API_URL_1, API_URL_BUILDER_1,
    EXCHANGE_2,PAGE_URL_2, API_URL_2, API_URL_BUILDER_2
} = require("../constant")

// build custom pages
const PageType_1 = Object.freeze({
    EXCHANGE    : EXCHANGE_1,
    TYPE        : DataTypes.OPTION,
    PAGE_URL    : PAGE_URL_1,
    API_URL     : API_URL_1,
    URL_BUILDER : API_URL_BUILDER_1 
})

const PageType_2 = Object.freeze({
    EXCHANGE    : EXCHANGE_2,
    TYPE        : DataTypes.OPTION,
    PAGE_URL    : PAGE_URL_2,
    API_URL     : API_URL_2,
    URL_BUILDER : API_URL_BUILDER_2 
})

// Page aggregator
const PageType = Object.freeze({
    PageType_1 : PageType_1, 
    PageType_2 : PageType_2, 
})

const PageParams = Object.freeze({
    EXCHANGE    : "EXCHANGE",
    PAGE_URL    : "PAGE_URL",
    API_URL     : "API_URL",
})

module.exports = { PageType, PageParams }