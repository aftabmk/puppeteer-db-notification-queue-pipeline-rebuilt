const { BrowserFactory } = require("../browser");
const { BrowserConfig } = require("../types");

let config;

if (!process.env.AWS_EXECUTION_ENV) 
    config = BrowserConfig.LOCAL
else 
    config = BrowserConfig.LAMBDA;


const buildBrowser = async () => {
  const manager = await BrowserFactory.getManager(config);
  return manager;
};

module.exports = { buildBrowser };
