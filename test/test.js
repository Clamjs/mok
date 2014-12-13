var mok = require('../');
var util = require('mace');


var mockData = mok.mok(__dirname + '/mock.json');

mok.doc(__dirname + '/mock.json', __dirname + '/mock.md');

require('fs').writeFileSync(__dirname + '/out.json', JSON.stringify(mockData, '', 2));