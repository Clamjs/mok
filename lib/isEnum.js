var util = require('mace');
function isEnumArray(obj) {
  var isEnum = false;
  obj.map(function (item) {
    var type = util.type(item);
    // json only string number object boolean
    if (!~'string number object boolean'.split(' ').indexOf(type)) {
      throw new Error('JSON Parser Failed. Object: ' + obj + 'is invalid');
    }
    return item;
  }).reduce(function (a, b) {
    // 已经是，无需继续
    if (isEnum) {return}
    var atype = util.type(a);
    var btype = util.type(b);
    if (atype !== btype) {
      isEnum = true;
      return b;
    }
    if ((atype === 'object' || atype === 'array') && (JSON.stringify(a) != JSON.stringify(b))) {
      isEnum = true;
      return b;
    }
    if (atype === 'object' && Object.keys(a).toString() != Object.keys(b).toString()) {
      isEnum = true;
      return b;
    }
    if (atype ==='array' && isEnumArray(a) && isEnumArray(b)) {
      isEnum = isEnumArray([a[0],b[0]]);
      return b;
    }
    if (atype !== 'array' && atype !== 'object' && a !== b) {
      isEnum = true;
      return b;
    }
    return b;
  });
  return isEnum;
}

exports = module.exports = isEnumArray;
exports.isEnumArray = isEnumArray;
exports.filter = function (obj, link) {
  if (!util.isArray(obj)) {
    return {
      data:obj,
      comment: link
    };
  }
  if (!isEnumArray(obj)) {
    return {
      data: obj.slice(0,1),
      comment: link.slice(0,1)
    };
  }
  var ret = [];
  var linkRet = [];
  obj.forEach(function (o,i) {
    if (!i) {
      linkRet.push(link[i]);
      return ret.push(o);
    }
    if (ret.every(function (m) {
      return isEnumArray([o,m]);
    })) {
      linkRet.push(link[i]);
      ret.push(o);
    }
  });
  return {
    data: ret,
    comment: linkRet
  };
};