var util = require('mace');
var type = require('./type.js');

function mockObject(json, rule) {
  var keys = (rule||'').split(',');
  var ret = {};
  util.each(json, function (v, k) {
    var k = k.split('|');
    var key = k[0];
    var subRule = k[1];
    // 在配置中的选择性配置
    if (!!~keys.indexOf(key)) {
      if (!_ranBool()){
        return;
      }
    }
    if (util.isArray(v)) {
      var val = mockArray(v, subRule);
      if (val != null || val.length > 0) {
        ret[key] = val;
      }
      return
    }
    if (util.isObject(v)) {
      var val = mockObject(v, subRule);
      if (val != null || Object.keys(val).length > 0) {
        ret[key] = val;
      }
      return;
    }
    if (type.isTimeStamp(v)) {
      return ret[key] = mockTimeStamp(v, subRule);
    }
    if (type.isMoney(v)) {
      return ret[key] = '$' + mockFloatNumber(v,subRule);
    }
    if (type.isFloatNumber(v)) {
      return ret[key] = mockFloatNumber(v, subRule);
    }
    if (type.isIntNumber(v)) {
      return ret[key] = mockIntNumber(v, subRule);
    }
    if (type.isBoolean(v)) {
      return ret[key] = mockBool(v, subRule);
    }
    if (type.isZhStr(v)) {
      return ret[key] = mockZhStr(v, subRule);
    }
    if (type.isImageLink(v)) {
      return ret[key] = mockImageLink(v, subRule);
    }
    if (type.isActionLink(v)) {
      return ret[key] = mockActionLink(v, subRule);
    }
    return ret[key] = mockString(v, subRule);
  });
  return ret;
}

function _ranBool() {
  return (util.range(0,100)|0)%3;
}
function mockTimeStamp (json, rule) {
  var date = new Date;
  var formatStr = rule || 'hh:mm:ss';
  var y = date.getFullYear();
  var M = date.getMonth() + 1;
  var d = date.getDate();
  var h = date.getHours();
  var m = date.getMinutes();
  var s = date.getSeconds();
  var u = date.getMilliseconds();
  // formatStr = formatStr.replace('yy', y).replace('y', util.pad(y, 2, '0', 0));
  util.each({
    y: y,
    M: M,
    d: d,
    h: h,
    m: m,
    s: s,
    S: u
  }, function (v,k) {
    formatStr = formatStr.replace(k + k, util.pad(v, 2, '0', 0));
    formatStr = formatStr.replace(k, String(v)[0]);
  });
  return formatStr;
};
function mockArray (json, rule) {
  var tokens = rule.split('-');
  var min = +tokens[0];
  var max = +tokens[1];
  if (!max) {
    max = min;
    min = 0;
  }
  // // 可能是枚举，也可能是多个重复
  var count = util.range(min, max)|0;
  // 
  if (tokens.length === 1 && max === 1) {
    count = 1;
  }
  if (count === 1) {
    if (json.length > 1) {
      var index = util.range(0, json.length - 1) | 0;
      var val = mockObject({'tmp': json[index]},'');
      return val.tmp;
    }
    if (!_ranBool()) {
      var val = mockObject({'tmp': json[0]},'');
      return val.tmp;
    }
  }
  var arr = [];
  for(;;) {
    if (--count <= 0) {break}
    var index = util.range(0, json.length - 1) | 0;
    var val = mockObject({'tmp': json[index]},'');
    // console.log(index,json, json[index], val, arr, count)
    arr.push(val.tmp);
  }
  return arr;
}

function mockImageLink (json, rule) {
  // /600x400/000/fff.gif&text=adf
  var tokens = rule.split('.').shift().toLowerCase().split('q');
  var size = tokens[0];
  return 'http://dummyimage.com/' + size + '/000/fff.gif&text='+rule;
}

function mockActionLink (json, rule) {
  // ignore rule and mock as current page;
  return rule ? json : '#' + json;
}

function mockFloatNumber (obj, rule) {
  // -1000-1000.0-100e-10-10
  var tokens = rule.toLowerCase().split('e');
  var etokens = (tokens[1] || '').split(/\b\-/);
  // float;
  var ftokens = tokens[0].split('.');
  // int;
  var itokens = (ftokens[0] || '').split(/\b\-/);
  ftokens = (ftokens[1] || '').split(/\b\-/);
  var imin = +itokens[0];
  var imax = +itokens[1];
  if (!imax) {
    imax = imin;
    imin = 0;
  }
  var ival = util.range(imin,imax)|0;
  var fmin = +ftokens[0];
  var fmax = +ftokens[1];
  if (!fmax) {
    fmax = fmin;
    fmin = 0;
  }
  var flen = util.range(fmin,fmax) | 0;
  var fval = '';
  var nums = '0123456789';
  for(;;) {
    // 
    if (--flen <= 0) {break}
    var index = util.range(0,9)|0;
    fval += nums[index];
  }

  if (fval.length) {
    fval = '.' + fval;
  }

  var intval = util.range(+itokens[0], +itokens[1])
  // 1-10.2-10e-10-10
  if (tokens[1]) {
    var emin = +etokens[0];
    var emax = +etokens[1];
    fval +='e' + util.range(emin, emax);
  }
  return parseFloat(ival + fval);
}
function mockIntNumber (obj, rule) {
  // 0-100
  var tokens = rule.split(/\b\-/);
  var min = +tokens[0];
  var max = +tokens[1];
  // |5;
  if (!max) {
    max = min;
    min = 0;
  }
  return util.range(min,max)|0;
}

function mockBool (obj, rule) {
  var tokens = rule.split('-');
  var min = +tokens[0];
  var max = +tokens[1];
  // |5;
  if (!max) {
    if (min == 1) {
      if (obj === 'true' || obj === true) {
        return true;
      }
      return false;
    }
    max = min;
    min = 0;
  }
  if (util.range(min,max)|0 / 3) {
    return true;    
  }
  return false;
}
function mockZhStr (obj, rule) {
  // 0-100
  var tokens = rule.split('-');
  var min = +tokens[0];
  var max = +tokens[1];
  // |5;
  if (!max) {
    max = min;
    min = 0;
  }
  var vals = '测试中文长度宽度高度溢出都可以';
  var len = util.range(min,max);
  var ret = '';
  for(;;) {
    if (--len <= 0) {break}
    var index = util.range(0,vals.length-1)|0;
    ret += vals[index];
  }
  return ret;
}
function mockString (obj, rule) {
  // 0-100
  var tokens = rule.split('-');
  var min = +tokens[0];
  var max = +tokens[1];
  // |5;
  if (!max) {
    max = min;
    min = 0;
  }
  var vals = 'abcdefghigklmnopqrstuvwxyz0123456789';
  var len = util.range(min,max)|0;
  var ret = '';
  for(;;) {
    if (--len <= 0) {break}
    var index = util.range(0,vals.length-1)|0;
    ret += vals[index];
  }

  return ret;
}

function resolve(json) {
  var jtype = util.type(json);
  if (jtype === 'array') {
    return json.map(function (item) {
      return resolve(item);
    });
  }
  if (jtype === 'object') {
    var ret = {};
    util.each(json, function (v, k) {
      var k = k.split('|');
      v = resolve(v);
      if (k.length > 1) {
        ret[k.join('|')] = v;
      } else {
        // 
        if (util.type(v) === 'array') {
          return ret[k + '|0-10'] = v;
        }
        // 
        if (util.type(v) === 'object') {
          return ret[k+'|1'] = v;
        }
        if (type.isTimeStamp(v)) {
          // timestamp
          return ret[k + '|yy-MM-dd hh:mm:ss'] = v;
        }
        var moneyInfo = type.isMoney(v);
        if (moneyInfo) {
          // $12.01; => 12.01
          // '$12.00'.match(/^\$(\d+)(\.\d+)*$/)
          // ["$12.00", "12", ".00"]
          var token = '|0-' + moneyInfo[1];
          if (moneyInfo[2]) {
            token += '.0-' + (moneyInfo[2].length - 1);
          }
          return ret[k + token] = v;
        }
        var floatInfo = type.isFloatNumber(v);
        if (floatInfo) {
          // '12.11111111e-10'.match(/^(\d+)\.(\d+)(?:e(\-*\d+))*$/i)
          // ["12.11111111e-10", "12", "11111111", "-10"]
          // 科学计数
          var token = '|';
          if (+floatInfo[1] < 0) {
            token += floatInfo[1] + '-' + Math.abs(+floatInfo[1]);
          } else {
            token += '0-' + floatInfo[1];
          }
          token +='.0-' + floatInfo[2].length;
          if (floatInfo[3]) {
            token +='e';
            if (+floatInfo[3] < 0) {
              token += floatInfo[3] + '-' + Math.abs(+floatInfo[3]);
            } else {
              token += '0-' + floatInfo[3];
            }
          }
          return ret[k + token] = v;
        }
        if (type.isIntNumber(v)) {
          var token = '|';
          if (parseInt(v) < 0) {
            token += v + '-' + Math.abs(v);
          } else {
            token += '0-' + v;
          }
          return ret[k + token] = v;
        }
        if (type.isBoolean(v)) {
          return ret[k + '|5'] = v;
        }
        if (type.isZhStr(v)) {
          return ret[k+'|1-50'] = v;
        }
        // //a.tbcdn.cn/a.jpg_200x300Q90.webp
        // {w:200,h:300,q:90}
        var imageInfo = type.isImageLink(v);
        if (imageInfo) {
          return ret[k+'|'+imageInfo] = v;
        }
        if (type.isActionLink(v)) {
          return ret[k + '|1'] = v;
        }
        return ret[k+'|1-100'] = v;
      }
    });
    return ret;
  }
  return json;
}

exports.resolve = function (json) {
  return resolve(type.filter(json));
};
exports.mock = function (json, isTrust) {
  json = isTrust ? json : exports.resolve(json);
  var tmp = mockObject({'tmp':json},'');
  return tmp.tmp;
};
