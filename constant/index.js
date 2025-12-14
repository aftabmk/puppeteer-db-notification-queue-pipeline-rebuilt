// Load .env only when not running on AWS Lambda
if (!process.env.AWS_EXECUTION_ENV) {
    require('dotenv').config();
}


const { 
    EXCHANGE_1, PAGE_URL_1, API_URL_1, API_URL_BUILDER_1, 
    EXCHANGE_100,PAGE_URL_100, API_URL_100, API_URL_BUILDER_100,
    TOPIC_ARN
} = process.env;

module.exports = { 
    TOPIC_ARN,
    EXCHANGE_1, PAGE_URL_1, API_URL_1, API_URL_BUILDER_1, 
    EXCHANGE_100,PAGE_URL_100, API_URL_100, API_URL_BUILDER_100,
}