var fs = require('fs');
var path = require('path');

var examples = module.exports = {};

fs.readdirSync(path.join(__dirname, '../../examples')).forEach(function(exampleName){
  examples[exampleName] = './examples/' + exampleName + '/js/app.js';
});
