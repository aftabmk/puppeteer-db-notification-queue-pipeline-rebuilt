// Load .env only when not running on AWS Lambda
if (!process.env.AWS_EXECUTION_ENV) {
    require('dotenv').config();
}


const { 
    EXCHANGE_1, PAGE_URL_1, API_URL_1, API_URL_BUILDER_1, 
    EXCHANGE_2,PAGE_URL_2, API_URL_2, API_URL_BUILDER_2,
    TOPIC_ARN
} = process.env;

module.exports = { 
    TOPIC_ARN,
    EXCHANGE_1, PAGE_URL_1, API_URL_1, API_URL_BUILDER_1, 
    EXCHANGE_2,PAGE_URL_2, API_URL_2, API_URL_BUILDER_2,
}