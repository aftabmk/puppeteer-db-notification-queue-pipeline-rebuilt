const { DataTypes } = require('./data');
const { 
    EXCHANGE_1, PAGE_URL_1, API_URL_1, API_URL_BUILDER_1,
    EXCHANGE_2, PAGE_URL_2, API_URL_2, API_URL_BUILDER_2,
    EXCHANGE_3, PAGE_URL_3, API_URL_3, API_URL_BUILDER_3,
    EXCHANGE_100,PAGE_URL_100, API_URL_100, API_URL_BUILDER_100
} = require("../constant")


const PageType_1 = Object.freeze({
    EXCHANGE    : EXCHANGE_1,
    TYPE        : DataTypes.OPTION,
    PAGE_URL    : PAGE_URL_1,
    API_URL     : API_URL_1,
    URL_BUILDER : API_URL_BUILDER_1 
}); 
const PageType_2 = Object.freeze({
    EXCHANGE    : EXCHANGE_2,
    TYPE        : DataTypes.FUTURE,
    PAGE_URL    : PAGE_URL_2,
    API_URL     : API_URL_2,
    URL_BUILDER : API_URL_BUILDER_2 
}); 
const PageType_3 = Object.freeze({
    EXCHANGE    : EXCHANGE_3,
    TYPE        : DataTypes.EQUITY,
    PAGE_URL    : PAGE_URL_3,
    API_URL     : API_URL_3,
    URL_BUILDER : API_URL_BUILDER_3 
}); 

const PageType_100 = Object.freeze({
    EXCHANGE    : EXCHANGE_100,
    TYPE        : DataTypes.OPTION,
    PAGE_URL    : PAGE_URL_100,
    API_URL     : API_URL_100,
    URL_BUILDER : API_URL_BUILDER_100 
});

module.exports = { PageType_1, PageType_2, PageType_3, PageType_100 };