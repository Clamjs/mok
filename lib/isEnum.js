var util = require('mace');
function isSame(a, b) {
  if (a === b) {
    return true;
  }
  var atype = util.type(a);
  var btype = util.type(b);
  if (atype === 'object' || atype === 'array') {
    return util.every(a, function (v,i) {
      return isSame(v, b[i]);
    });
  }
  if (btype === atype) {
    return true;
  }
  return false;
}
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
    // 类似
    if (!isSame(a, b)) {
      isEnum = true;
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