const { main , close } = require('./main');

const timeWorkFlow = async() => {
  console.time("workflow");
  await main();
  console.timeEnd("workflow");
}
const runTimer = async (interval = 30, iterations = 1) => {
  for (let i = 0; i < iterations; i++) {
    await timeWorkFlow();
    if (i < iterations - 1) {
      console.log(`Waiting ${interval} seconds before next run...`);
      await new Promise(resolve => setTimeout(resolve, interval * 1000));
    }
  }
  await close();
  console.log("All iterations completed.");
};

const warn = "⚠️  Please provide interval in seconds and number of iterations.\nExample: node index.js [30] [2].\n [30] : interval & [2] : iteration";
const runLocal = async () => {
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


const handler = async () => {
  timeWorkFlow();
  return { status: 200, message : "workflow completed" };
};

// Detect environment and execute
if (process.env.AWS_EXECUTION_ENV) {
  exports.handler = handler;
} else {
  runLocal();
}
