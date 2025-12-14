const { 
    PageType_1,PageType_2,PageType_3, 
    PageType_100
} = require('./pageAggregator');

// Page aggregator
const PageType = Object.freeze({
    PageType_1,PageType_2,PageType_3,
    PageType_100
})

const PageParams = Object.freeze({
    TYPE        : "TYPE",
    API_URL     : "API_URL",
    EXCHANGE    : "EXCHANGE",
    PAGE_URL    : "PAGE_URL",
})

module.exports = { PageType, PageParams }