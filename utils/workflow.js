const { DataStore } = require("../store");
const { BrowserFactory } = require("../browser");


const workflow = async () => {
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
  DataStore.set("cookie", cookies, "cookie");

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

module.exports = { workflow };