const { DataStore } = require("../store");
const { PAGE_URL_1, API_URL_1, API_URL_2 } = require('../constant');

const buildUrl = () => {
  const page1 = {
    id: "option-chain",
    type: "page",
    url: PAGE_URL_1,
  };
  const api1 = {
    id: "option-chain-contract-info",
    type: "api",
    url: API_URL_1,
  };
  const api2 = {
    id: "option-chain-expiry",
    type: "api",
    url: API_URL_2,
  };

  DataStore.set(page1.id, page1.url, page1.type);
  DataStore.set(api1.id, api1.url, api1.type);
  DataStore.set(api2.id, api2.url, api2.type);

  debugger
};

module.exports = { buildUrl };