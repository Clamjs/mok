var loader = require('./loader.js');
var docjs = require('./doc.js');

exports.loader = loader;
exports.load = function (file) {
  return loader.load(file).json;
};
exports.mok = function (input, isTrust) {
  return mockjs.mock(json);
};
exports.mock = function (json, isTrust) {
  return mockjs.mock(json, true);
};
exports.doc = function (input, output) {
  return docjs.doc(input, output);
};
