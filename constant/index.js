require('dotenv').config()

let { PAGE_URL_1, API_URL_1,API_URL_2,ALLOWED, DISALLOWED } = process.env;

ALLOWED = JSON.parse(ALLOWED), DISALLOWED = JSON.parse(DISALLOWED);
debugger

module.exports = { PAGE_URL_1, API_URL_1, API_URL_2, ALLOWED, DISALLOWED }