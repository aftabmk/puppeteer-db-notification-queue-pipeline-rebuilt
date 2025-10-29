const { DataStore } = require("../store");
const { ContentType } = require("../types");
const { BrowserFactory } = require("../browser");

const workflow = async () => {
  const manager = await BrowserFactory.createManager({
    incognito: true,
    headless: false,
    devtools: true,
  });

  const [page1, ...rest] = DataStore.getAllPages();

  const { EXCHANGE ,PAGE_URL , API_URL } = page1.getParams();

  const page = await manager.pageManager.newPage(EXCHANGE);
  await page.goto(PAGE_URL,{waitUntil: "domcontentloaded"});

  const result  = await manager.evaluator.fetchInsidePage(EXCHANGE,API_URL);
  const { status, data } = result;
  if(status != 200)
    return;

  const { expiryDates } = data;
  const formattedData = expiryDates.slice(0,2);  

  page1.buildUrl(formattedData);
  // DataStore.set("result", result, ContentType.APPLICATION_JSON);
  const [EXPIRY_URL_1,EXPIRY_URL_2] = page1.getExpiryUrl();

  const [ data_1, data_2 ] = await Promise.allSettled([
    await manager.evaluator.fetchInsidePage(EXCHANGE,EXPIRY_URL_1),
    await manager.evaluator.fetchInsidePage(EXCHANGE,EXPIRY_URL_2)
  ]); 
  
  const jsonArray = [];

  const { value : { status : status_1, data : option_1 }} = data_1;
  if(status_1 == 200)
    jsonArray.push(option_1);
  
  const { value : {status : status_2, data : option_2} } = data_2;
  if(status_2 == 200)
    jsonArray.push(option_2);

  page1.insertArray(jsonArray);

  // debugger;
  await manager.close();
};

module.exports = { workflow };