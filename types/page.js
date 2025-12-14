const { PageType_1,PageType_2 } = require('./pageAggregator');

// Page aggregator
const PageType = Object.freeze({
    PageType_1,
    PageType_2,
})

const PageParams = Object.freeze({
    EXCHANGE    : "EXCHANGE",
    PAGE_URL    : "PAGE_URL",
    API_URL     : "API_URL",
})

module.exports = { PageType, PageParams }