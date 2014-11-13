var util = require('mace')(module);
var debug = util.debug('mok:doc');
var loader = require('./loader.js');

function resolveHeader (_top, _bottom, ret) {
  var _title = '#接口文档';
  var _desc  = '';
  if (_top.title) {
    _title = '#' + _top.title;
    _desc = [_top.desc || '', _bottom.title || '', _bottom.desc||''].join('');
  } else if (_bottom.title) {
    _title = "#" + _bottom.title;
    _desc = [_top.desc || '', _bottom.desc||''].join('');
  }
  ret.push(_title);
  ret.push('---------');
  ret.push(_desc);
  return ret;
}


exports.doc = function (input, output) {
  var info = loader.load(input);
  var json = info.json;
  var comments = info.comment;
  var ret = resolveHeader(comments['^'] || {}, comments['$'] || {}, []);
  var bodyData = [];
  var linkData = [];
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
        if (name === '^' || name === '$') {return}
        var subNs = subInfo.name;
      } else {
        var subNs = ns + '["'+subInfo.name+'"]';
      }
      var tr = [subInfo.name, subInfo.type, subInfo.title, subInfo.desc, subInfo.rule].map(function (v) {

        return ' ' + (v || '-').replace(/\n\r*/g, ' ').trim() + ' ';
      });
      if (subInfo[loader.$$]) {
        tr.push('@link ' + subNs);
        resolve(subInfo[loader.$$], linkData, subNs);
      } else {
        tr.push(' - ');
      }
      table.push(tr.join(' | '));
    });
    area.push(table.join('\n'));
  }
  resolve(comments, bodyData, '');
  ret.push(bodyData.join('\n'));
  ret.push('');
  ret.push(linkData.join('\n'));
  ret.push('');
  ret.push('*----------------Powered By MockDoc----------------------*');
  ret.push('');
  output && require('fs').writeFileSync(output, ret.join('\n'));
  return ret.join('\n');
};
