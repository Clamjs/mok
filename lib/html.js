var util = require('mace')(module);
var debug = util.debug('mok:doc');
var loader = require('./loader.js');
var helper = require('./helper.js');
var type = require('./type.js');


function _resolveMultiText(text, repl){
  return text.trim().replace(/\n\r*/g, repl||'<br />');
}
function _filterComment(json, comment) {
  comment = comment || {};
  var ret = {
    type: comment.type || util.type(json),
    name: _resolveMultiText(comment.name || '','-'),
    title: _resolveMultiText(comment.title || '','-'),
    desc: _resolveMultiText(comment.desc || ''),
    rule: comment.rule || '',
    example: JSON.stringify(type.filter(json), '', 2)
  };
  if (comment.type === 'array') {
    var tmp;
    var info = ret[loader.$$] = [];
    var subComment = comment[loader.$$];
    util.each(json, function (item, i) {
      if (!tmp || !type.isSameAs(item, tmp)) {
        var _itemComment = subComment[i];
        _itemComment.name = String(info.length);
        var subInfo = _filterComment(item, _itemComment);
        info.push(subInfo);
        tmp = item;
      }
    });
    return ret;
  }
  if (comment.type === 'object') {
    var info = ret[loader.$$] = {};
    var subComment = comment[loader.$$];
    util.each(json, function (item, i) {
      var subInfo = _filterComment(item, subComment[i]);
      info[i] = subInfo;
    });
    return ret;
  }
  return ret;
}
var fs = require('fs');
var path = require('path');
function _getScope (input) {
  var info = loader.load(input);
  return _filterComment(info.tiny, info.comment);
}
function _getDirInfo(input) {
  var stat = fs.statSync(input);
  if (stat.isFile()) {
    return [path.basename(input)];
  }
  if (stat.isDirectory()) {
    return fs.readdirSync(input).filter(function (file) {
      return file.match(/\.json$/i) && !file.match(/\-mok\.json$/i);
    });
  }
  return;
}
function _writeInfo(input, output) {
  var dirname = input;
  if (!fs.statSync(input).isDirectory()) {
    dirname = path.dirname(input);
  }
  var filesInfo = _getDirInfo(input);
  if (filesInfo) {
    var files = [];
    filesInfo.forEach(function (file) {
      var filepath = path.join(dirname, file);
      var basename = path.basename(filepath).replace('.json','.js');
      var outfile = path.join(output, '/data/', basename);
      files.push({
        path: './data/'+basename,
        name: basename
      });
      fs.writeFileSync(outfile, 'define(' + JSON.stringify(_getScope(filepath),'', 2) +');');
    });
    fs.writeFileSync(path.join(output,'/map.js'),'define({"files":'+JSON.stringify(files,'',2)+'})');
  }
}
exports.html = function (input, output) {
  if (!fs.existsSync(input)) {
    throw Error('Source folder not exist');
    return;
  }
  require('cpr').cpr(path.join(__dirname, '/../www/'), output,{
    deleteFirst: false, //Delete "to" before
    overwrite: true, //If the file exists, overwrite it
    confirm: true //After the copy, stat all the copied files to make sure they are there
  }, function (err, files) {
    _writeInfo(input, output);
  });
};