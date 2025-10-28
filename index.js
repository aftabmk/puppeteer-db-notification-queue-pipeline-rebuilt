const { BrowserFactory } = require("./browser");
const { DataStore } = require("./store/dataStore/DataStore");

const buildUrl = () => {
  const page1 = {
    id: "option-chain",
    type: "page",
    url: "https://www.nseindia.com/option-chain",
  };
  const api1 = {
    id: "option-chain-contract-info",
    type: "api",
    url: "https://www.nseindia.com/api/option-chain-contract-info?symbol=NIFTY",
  };
  const api2 = {
    id: "option-chain-expiry",
    type: "api",
    url: "https://www.nseindia.com/api/option-chain-v3?type=Indices&symbol=NIFTY&expiry=28-Oct-2025",
  };

  DataStore.set(page1.id, page1.url, page1.type);
  DataStore.set(api1.id, api1.url, api1.type);
  DataStore.set(api2.id, api2.url, api2.type);
};

const main = async () => {
  const manager = await BrowserFactory.createManager({
    incognito: true,
    headless: false,
    devtools: true,
  });

  const page = await manager.pageManager.newPage("main");
  await page.goto(DataStore.get("option-chain"), {
    waitUntil: "domcontentloaded",
  });

  const cookies = await manager.cookieManager.getCookies("main");
  DataStore.set("cookie", cookies, "string");

  const result = await manager.evaluator.fetchInsidePage(
    "main",
    DataStore.get("option-chain-contract-info")
  );
  DataStore.set("result", result, "json");

  const option = await manager.evaluator.fetchInsidePage(
    "main",
    DataStore.get("option-chain-expiry")
  );
  DataStore.set("option", option, "json");

  debugger;
  await manager.close();
};

buildUrl();
main();
