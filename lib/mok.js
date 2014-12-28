var loader = require('./loader.js');
var helper = require('./helper.js');

exports.json = function (file) {
  return loader.load(file).json;
};
exports.html = exports.doc = function (input, output) {
  require('./html.js').html(input, output);
};
exports.mock = function (json, isTrust) {
  return helper.mock(json, isTrust);
};