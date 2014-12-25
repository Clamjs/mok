var loader = require('./loader.js');
var docjs = require('./doc.js');
var mockjs = require('./mock.js');
exports = module.exports = function (options) {

};
exports.options = {
  // path
  '\/json\/ajax.*': [{
      rules: [
        'a\=234234',
        'b\=222',
        '\am\w+?=xxx'
      ],
      // local 默认都是json文件
      // 如果是json文件。
      //   如果json文件mock结果为空
      //   转发线上。
      // 如果是js,则执行js文件
      //   如果js文件执行结果为空。
      //   则转发线上地址。
      // 其他必须是完整的url。
      //   直接转发，不做任何处理。
      //   如果转发回本地，检查循环请求问题。
      origin: 'local',

  }],
};

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
// build for apiDoc 
exports.apiDoc = function (input, output, options) {

};
