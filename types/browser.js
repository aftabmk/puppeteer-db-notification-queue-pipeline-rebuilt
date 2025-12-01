const BrowserConfig = Object.freeze({
  LOCAL: Object.freeze({
    incognito: true,
    headless: false,
    devtools: true,
    args: ['--start-maximized'] 
}),

LAMBDA: Object.freeze({
    incognito: true,
    headless: true, 
    devtools: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'] 
  })
});

module.exports = { BrowserConfig };