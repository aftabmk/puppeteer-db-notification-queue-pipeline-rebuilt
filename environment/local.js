const { main , close } = require('../main');

const runTimer = async (interval = 30, iterations = 1) => {
  for (let i = 0; i < iterations; i++) {
    await main();
    if (i < iterations - 1) {
      console.log(`Waiting ${interval} seconds before next run...`);
      await new Promise(resolve => setTimeout(resolve, interval * 1000));
    }
  }
  
  await close();
};

const warn = "⚠️  Please provide interval in seconds and number of iterations.\nExample: node index.js [30] [2].\n [30] : interval & [2] : iteration";

const local = async () => {
  const [, , intervalArg,runsArg] = process.argv;
  const interval = parseInt(intervalArg, 10), iterations = parseInt(runsArg,10);
  
  if (isNaN(interval)) {
    console.warn(warn);
    return;
  }
  
  if(isNaN(iterations)) {
    console.warn(warn);
    return;
  }
  
  await runTimer(interval,runsArg);
};

module.exports = { local };