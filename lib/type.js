var util = require('mace');
var url = require('url');
var path = require('path');

function isMoney (s) {
  return String(s).match(/^\$(\d+)(\.\d+)*$/);
}
function isNumber (s) {
  return parseFloat(s) === +s;
}
function isFloatNumber (s) {
  return isNumber(s) && String(s).match(/^(\d+)\.(\d+)(?:e(\-*\d+))*$/i);
}
function isIntNumber (s) {
  return isNumber(s) && !isFloatNumber(s);
}
function isTimeStamp (s) {
  // 
  return isNumber(s) && String(s).length === 13;
}
function isBoolean (s) {
  return String(s) === 'true' || String(s) === 'false';
}
function isZhStr (s) {
  return String(s).match(/[^\x00-\xff]/i);
}
function isImageLink(s) {
  var urlinfo = url.parse(String(s), true);
  var extname = path.extname(urlinfo.pathname).match(/\.(jpg|jpeg|gif|png|webp|bmp)$/i);
  if (!extname) {
    return false;
  }
  // /a/b/c.jpg_200x300Q90.webp;
  return urlinfo.pathname.split('/').pop().split('_').pop();
}

function isActionLink(s) {
  // a.htm
  // a.html
  var urlinfo = url.parse(String(s), true);
  return path.extname(urlinfo.pathname).match(/\.(htm|html)$/);
}
function isSameAs(a, b) {
  if (a === b) {
    return true;
  }
  var atype = util.type(a);
  var btype = util.type(b);
  if (atype !== btype) {
    return false;
  }

  if (atype === 'object') {
    var akeys = Object.keys(a).toString();
    var bkeys = Object.keys(b).toString();
    if (akeys !== bkeys) {
      return false;
    }
    // 所有的几乎都一样
    return util.every(a, function (val, key) {
      return isSameAs(val, b[key]);
    });
  }
  if (atype === 'array') {
    return a.every(function (aitem) {
      return b.every(function (bitem) {
        return isSameAs(aitem,bitem);
      });
    });
  }
  if (atype === 'number') {
    if (isTimeStamp(a)) {
      return !!isTimeStamp(b);
    }
    if (isFloatNumber(a)) {
      return !!isFloatNumber(b);
    }
    return !isFloatNumber(b);
  }
  if (atype === 'string' && isZhStr(a)) {
    return !!isZhStr(b);
  }
  return true;
}

function filter(arr) {
  var tmp;
  if (!util.isArray(arr) && !util.isObject(arr)) {return arr}
  // {a:[]}
  if (util.isObject(arr)) {
    var ret = {};
    util.each(arr, function (v,k) {
      ret[k] = filter(v);
    });
    return ret;
  }
  return arr.slice(0).filter(function (item) {
    if (!tmp) {
      return tmp = filter(item);
    }
    if (isSameAs(tmp, filter(item))) {
      return false;
    }
    return tmp = filter(item);
  });
}
function resolve (o) {
  var specVals = {
    "null": null,
    "undefined": undefined,
    "true": true,
    "false": false
  };
  if (specVals.hasOwnProperty(o)) {
    return specVals[o];
  }
  return o;
}
[
    isMoney
  , isNumber
  , isBoolean
  , isSameAs
  , isFloatNumber
  , isIntNumber
  , isTimeStamp
  , isZhStr
  , isActionLink
  , isImageLink
  , filter
  , resolve
].forEach(function (fn) {
  exports[fn.name] = fn;
});
exports.type = function (o) {
  return util.type(o);
};
exports.isArray = Array.isArray;