var JSONParser = require('json-parser');
var util = require('mace')(module);
var debug = util.debug('mok:loader');
var fs = require('fs');

function _load (file) {
  var info = JSONParser.parse(fs.readFileSync(file).toString());
  var json = _getJSONInfo(info);
  var comment = _getCommentInfo(info);
  return {
    json: json,
    comment: comment
  };
}
function _getJSONInfo (info, ret) {
  if (!ret) {
    ret = util.type(info) === 'array' ? [] : {};
  }
  util.each(info, function (val, key) {
    if (_isComment(key)) {
      return;
    }
    if (typeof val === 'object') {
      val = _getJSONInfo(val);
    }
    ret[key] = val;
  });
  return ret;
}

function _getCommentInfo (info, ret) {
  if (!ret) {
    ret = util.type(info) === 'array' ? [] : {};
  }
  util.each(info, function (val, key) {
    var type = util.type(val);
    var keyInfo = _getKeyInfo(key);
    var detail = ret[keyInfo.name] = ret[keyInfo.name] || {};
    detail.type = type;
    util.merge(detail, keyInfo);
    // 是注解
    if (_isComment(key)) {
      var comments = _getDescInfo(val);

      util.merge(detail, comments);
      return;
    }

    if (type === 'array' || type === 'object') {
      return detail[exports.$$] = _getCommentInfo(val);
    }
  });
  return ret;
}

function _isComment (str) {
  return String(str).match(/^\/\/\s*/);
}

function _getKeyInfo (key) {
  key = String(key).replace(/^\/\//,'').trim().split('|');
  return {
    name: key[0].trim(),
    rule: (key[1] || '').trim()
  };
}
function _getDescInfo (val) {
  var info = {
    title:'',
    desc:''
  };
  util.each(val, function (comments) {
    if (typeof comments === 'string') {
      comments = [comments];
    }
    util.each(comments, function (comment) {
      comment = comment.trim();
      if (_isComment(comment)) {
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
exports = module.exports = _load;
exports.load = _load;
exports.$$ = '$$';
