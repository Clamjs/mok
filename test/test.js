var mok = require('../');
var util = require('mace');


var mockData = mok.mock(mok.json(__dirname + '/mock.json'));

mok.doc(__dirname + '/mock.json', __dirname + '/mock.md');

require('fs').writeFileSync(__dirname + '/out.json', JSON.stringify(mockData, '', 2));