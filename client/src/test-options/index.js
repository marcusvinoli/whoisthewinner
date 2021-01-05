const TestResults = require('../test-results');
const buildOptionCreator = require('./test-options');

var Option = buildOptionCreator(TestResults);

module.exports = Option;