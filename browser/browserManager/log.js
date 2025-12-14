const LOG = Object.freeze({
  LAUNCH: ({ isLambda, headless }) =>
    console.log(`✅ Browser launched (${isLambda ? 'Lambda' : 'Local'} | ${headless ? 'headless' : 'head'})`),

  CLOSE: 
  	console.log('🧩 Browser closed cleanly'),
});

module.exports = { LOG };