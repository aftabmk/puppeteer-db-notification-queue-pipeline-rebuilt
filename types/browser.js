const BrowserConfig = Object.freeze({
  LOCAL: Object.freeze({
    headless: false,
    devtools: true,
    args: ['--start-maximized'] 
}),

LAMBDA: Object.freeze({
    headless: true, 
    devtools: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'] 
  })
});

const ViewPort = Object.freeze({
  Width : 1920,
  Height : 1080
});

module.exports = { BrowserConfig, ViewPort };