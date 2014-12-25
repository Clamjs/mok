var util = require('mace')(module);
var debug = util.debug('mok:mock');
var mockjs = require('mockjs');
var isEnumArray  = require('./isEnum.js');
exports.mock = function (json, isTrust) {
  if (!isTrust) {
    json = exports.resolve(json);
  }
  return mockjs.mock(json);
};
var _rules = {
  'enum': '1',
  'array': '0-50',
  'string': '1-10',
  'bool': '1-5',
  'datetime': 'yyyy-MM-dd HH:mm:ss SS',
  'nature': '0-100000000000',
  'integer':'-100000000000-100000000000',
  'float': '-100000000000-100000000000.0-10',
};

// 更加详细的数据格式
function _getStrictRule (obj) {
  var type = typeof obj;
  if (type === 'object') {
    // 'enum': [{}];
    type = util.type(obj);
    if (type === 'array' && obj.length > 2) {
      if (isEnumArray(obj)) {
        return _rules.enum;
      }
      return _rules.array;
    }
    // 普通数组
    return _rules.array;
  }
  type = util.type(obj);
  if (type === 'string') {
    if (obj === 'true' || obj === 'false') {
      type = 'boolean';
    } else if (+obj) {
      type = 'number';
      obj = +obj;
    } else {
      // string;
      return _rules.string;
    }
  }
  if (type ==='boolean') {
    return _rules.bool;
  }
  if (type === 'number') {
    if (!~String(obj).indexOf('.')) {
      if (String(obj).length === String(+new Date).length) {
        return _rules.datetime;
      }
      if (obj < 0) {
        return _rules.integer;
      }
      return _rules.nature;
    }
    return _rules.float;
  }
  return '';
}
exports.rules = _rules;
exports.isEnumArray = isEnumArray;
exports.resolve = function (json) {
  var ret = util.type(json) === 'array' ? [] : {};
  util.each(json, function (val, key) {
    var type = util.type(val);
    if (type === 'array' || type === 'object') {
      val = exports.resolve(val);
    }
    if (typeof key === 'string' && !~key.indexOf('|')) {
      key = key + '|' + _getStrictRule(val);
    }
    ret[key] = val;
  });
  return ret;
};