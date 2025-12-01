const BrowserConfig = Object.freeze({
  LOCAL: Object.freeze({
    incognito: true,
    headless: false,
    devtools: true,
    args: ['--start-maximized'] // Common local arg
  }),
  
  LAMBDA: Object.freeze({
    incognito: true,
    headless: true, // Lambda almost always requires headless
    devtools: false,
    // Lambda often needs specific chromium args to work
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'] 
  })
});

module.exports = { BrowserConfig };