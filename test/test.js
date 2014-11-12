var mok = require('../');
var util = require('mace')(module);
mok.doc(__dirname + '/mock.json', __dirname + '/mock.md');
var json = mok.mock(__dirname + '/mock.json');
require('fs').writeFileSync(__dirname + '/out.json', JSON.stringify(json, '', 2));
util.log(json);
