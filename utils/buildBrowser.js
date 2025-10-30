const { BrowserFactory } = require("../browser");

const buildBrowser = async () => {
  const manager = await BrowserFactory.getManager({
    incognito: true,
    headless: false,
    devtools: true,
  });

  return manager;
};

module.exports = { buildBrowser };
