const { pageBuilder } = require('./buildPage');
const { buildBrowser } = require('./buildBrowser');
const { WorkflowInstance } = require('./workflow');

module.exports = { pageBuilder, WorkflowInstance, buildBrowser };