const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    devtools: true,
  });
  const page = await browser.newPage();

  //   await page.setJavaScriptEnabled(false);
  // 🔹 Don't disable JS — just block scripts and styles
  await page.route("**/*", (route) => {
    const type = route.request().resourceType();
    if (["stylesheet", "script", "font", "image"].includes(type)) {
      route.abort("blockedbyclient");
    } else {
      route.continue();
    }
  });
  await page.goto(
  );
  //   await page.goto('https://www.nseindia.com/option-chain');

  await browser.close();
})();
