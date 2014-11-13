var loader = require('./loader.js');
var docjs = require('./doc.js');

exports.loader = loader;
exports.load = function (file) {
  return loader.load(file).json;
};
exports.mok = function (file, isTrust) {
  return mockjs.mock(loader.load(file).json, isTrust);
};
exports.mock = function (json, isTrust) {
  return mockjs.mock(json, true);
};
exports.doc = function (input, output) {
  return docjs.doc(input, output);
};
