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

module.exports = { BrowserConfig };