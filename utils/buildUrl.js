const { DataStore } = require("../store");
const { ContentType } = require('../types')
const { PAGE_URL_1, API_URL_1, API_URL_2 } = require('../constant');

const buildUrl = () => {
  const page1 = {
    id: "option-chain",
    type: ContentType.HTTP,
    url: PAGE_URL_1,
  };
  const api1 = {
    id: "option-chain-contract-info",
    type: ContentType.HTTP,
    url: API_URL_1,
  };
  const api2 = {
    id: "option-chain-expiry",
    type: ContentType.HTTP,
    url: API_URL_2,
  };

  DataStore.set(page1.id, page1.url, page1.type);
  DataStore.set(api1.id, api1.url, api1.type);
  DataStore.set(api2.id, api2.url, api2.type);

  debugger
};

module.exports = { buildUrl };