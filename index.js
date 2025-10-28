const { buildUrl } = require('./utils/buildUrl');
const { workflow } = require('./utils/workflow');


const main = async () => {
  buildUrl();
  await workflow();
};

main();
