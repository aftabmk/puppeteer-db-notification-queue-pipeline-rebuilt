const { pageBuilder } = require('./buildPage');
const { WorkflowInstance } = require('./workflow');
const { buildBrowser } = require('./buildBrowser');

module.exports = { pageBuilder, WorkflowInstance, buildBrowser };