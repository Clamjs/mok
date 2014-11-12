var mockjs = require('mockjs');
var JSONParser = require('json-parser');
var util = require('mace')(module);
var fs = require('fs');

function mockResolve (json) {
  var ret = util.type(json) === 'array' ? [] : {};
  var dftRule = {
    'string': '1-10',
    'integer': '0-10000000',
    'float': '0-10000000.2',
    'boolean': '1-5',
    'array': '0-10',
    'object': '1-10'
  };
  util.each(json, function (val, name) {

    var valType = util.type(val);
    if (valType === 'array' || valType === 'object') {
      val = mockResolve(val);
    }
    if (!util.isNumber(name) && !~name.indexOf('|')) {
      if (valType === 'number') {
        // no float
        if (!~String(val).indexOf('.')) {
          valType = 'integer';
        } else {
          valType = 'float';
        }
      }
      if (dftRule[valType]) {
        name = name + '|' + dftRule[valType];
      }
      ret[name] = val;
      return;
    }
    return ret[name] = val;
  });
  return ret;
}

/**
 * 获取对象的潜在信息
 * @param  {String} key  JSON的key
 * @return {Object}      KeyInfo
 */
function getKeyInfo (key) {
  key = key.split('|');
  return {
    name: key[0].trim(),
    rule: (key[1] || '').trim()
  };
}
/**
 * 获取注释中潜藏的信息
 * @param  {Array} val  目标数据
 * @return {Object}     CommentInfo
 */
function getCommentInfo (val) {
  var info = {title:'', desc:''};
  util.each(val, function (comments) {
    util.each(comments, function (comment) {
      if (comment.match(/^\/\//)) {
        comment = comment.replace(/^\/\//,'').trim();
        if (!info.title) {
          return info.title = comment;
        }
        return info.desc += '\n' + comment;
      }
      info.desc += comment.trim().replace(/^\/\*\*?|\*\/$/g,'').replace(/(\s+)\*/g,'$1');
    });
  });
  return info;
}
/**
 * 获取所有的注释信息
 * @param  {Object} info 解析的源数据
 * @param  {Object} ret  返回信息
 * @param  {JSON} data   对应数据
 * @return {Object}      最终信息
 */
function getComments (info, ret, data) {
  ret = ret || {};
  util.each(info, function (val, key) {
    key = String(key);
    // 是正常的描述
    if (key.match(/^\/\//)) {
      key = getKeyInfo(key.replace(/^\/\//,'').trim());
      val = getCommentInfo(val);
      var vType = util.type(data[key.name]);
      val.type = vType;
      val.rule = key.rule;
      val.name = key.name;
      ret[key.name] = ret[key.name] || {};
      return util.merge(ret[key.name], val);
    }
    // 可能是对象或者数组的描述
    key = getKeyInfo(key);
    var subData = data[key.name];
    var vType = util.type(subData);
    var subComments = {};
    ret[key.name] = ret[key.name] || {};
    util.merge(ret[key.name], {
      name: key.name,
      rule: key.rule,
      type: vType
    });
    // not comment but may be value is an object;
    if (vType === 'array') {
      // hack for merge; not concat
      subComments.length = subData.length;
      getComments(val, subComments, subData);
      subComments = util.makeArray(subComments);
      ret[key.name][exports._subKey] = subComments;
      // need sub comments;
    }
    if (vType === 'object') {
      getComments(val, subComments, subData);
      ret[key.name][exports._subKey] = subComments;
    }
  });
  return ret;
}
/**
 * 获取JSON中的详细信息。
 * @param  {JSON} json   目标数据
 * @param  {Object} ret  返回信息
 * @return {Object}      返回信息
 */
function getJSONData (json, ret) {
  ret = ret || {};
  util.each(json, function (val, key) {
    key = getKeyInfo(String(key));
    var vType = util.type(val);
    var data = val;

    if (vType === 'array') {
      data = {};
      data.length = val.length;
      getJSONData(val, data);
      data = util.makeArray(data);
    } else if (vType === 'object') {
      data = {};
      getJSONData(val, data);
    }
    ret[key.name] = data;
  });
  return ret;
}
/**
 * 获取JSON文件中的信息
 * @param  {Path} file    文件地址
 * @return {JSONInfo}     分析的最终信息
 */
function getJSONInfo (file) {
  // 防止 ' 和 "丢失问题。
  // 不能完全解决问题。但是可以解决大部分问题。
  var code = '{"data":\n'+ fs.readFileSync(file,'utf-8').toString().replace(/([^\n\r]+)\:([^\n\r]+)/mg, function ($, key, val) {
    if (!key.match(/[\'\"]/)) {
      key = key.replace(/\S+/, '"$&"');
    }
    return key.replace(/\'/g,'\"') + ': ' + val.replace(/\'/g,'\"') ;
  }) + "\n}";
  // 分析结构（目前在数组上有问题）
  var info = JSONParser.parse(code);
  
  var json = getJSONData(new Function('return '+code+'')());
  var comments = getComments(info, null, json);
  // fs.writeFileSync(file.replace('.ason','') + '.json', JSON.stringify(comments, '', 2));
  return {
    data: json.data,
    comments: comments.data,
    info: info
  };
}

exports.json = function (file) {
  return getJSONInfo(file).data;
};
/**
 * 模拟数据
 * @param  {JSON}  json      目标数据
 * @param  {Boolean} isTrust 是否需要关闭智能匹配的模糊模式
 * @return {JSON}            模拟数据
 */
exports.mock = function (file, isTrust) {
  var json = exports.json(file);
  if (!isTrust) {
    json = mockResolve(json);
  }
  return mockjs.mock(json);
};
// 注册的子节点key，防止和业务命名冲突。
exports._subKey = '$$sub';
exports.getJSONInfo = getJSONInfo;

/**
 * 生成DOC
 * @param  {Path} file     目标文件地址
 * @param  {Path} output   输出文件地址
 * @return {Markdown}        输出的markdown内容
 */
exports.doc = function (file, output) {
  var info = exports.getJSONInfo(file).comments;

  var ret = ['# ' + (info.title || '接口文档'), '-------', (info.desc || '').replace(/\n\r*/g,'> ').trim(), ''];
  var bodyData = [''];
  var linkData = [''];

  function resolve (info, area, ns) {
    var table = [''];
    if (ns) {
      table.push('* ' + ns + '的描述');
      table.push('');
    }

    var thead = ['字段', '类型', '名称','描述', '规则', '详情'];
    table.push(thead.join(' | '));
    table.push(new Array(thead.length).join('---|---'));

    util.each(info, function (subInfo, name) {
      if (!ns) {
        var subNs = subInfo.name;
      } else {
        var subNs = ns + '["'+subInfo.name+'"]';
      }
      var tr = [subInfo.name, subInfo.type, subInfo.title, subInfo.desc, subInfo.rule].map(function (v) {
        return ' ' + (v || '-').replace(/\n\r*/g, ' ').trim() + ' ';
      });
      if (subInfo[exports._subKey]) {
        tr.push('@link ' + subNs);
        resolve(subInfo[exports._subKey], linkData, subNs);
      } else {
        tr.push(' - ');
      }
      table.push(tr.join(' | '));
    });
    area.push(table.join('\n'));
  }
  resolve(info[exports._subKey], bodyData, '');
  bodyData.unshift('## 接口描述');
  linkData.unshift('## 引用数据');
  
  ret.push(bodyData.join('\n'));
  ret.push('');
  ret.push(linkData.join('\n'));
  ret.push('');
  ret.push('*Powered By MockDoc* ');
  ret.push('');
  output && fs.writeFileSync(output, ret.join('\n'));
  return ret.join('\n');
};