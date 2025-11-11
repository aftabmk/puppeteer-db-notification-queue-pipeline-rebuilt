const { local, lambda } = require('./environment');
const { AWS_EXECUTION_ENV } = process.env;
// Detect environment and execute
if (AWS_EXECUTION_ENV) 
  exports.handler = lambda;
else 
  local();
