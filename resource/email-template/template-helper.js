const htmlHelper = require('./html-helper');
const cssHelper = require('./css-helper');
const fontHelper = require('./font-helper');

templateHelper = {};


templateHelper = Object.assign(templateHelper, htmlHelper, cssHelper);

console.log(templateHelper);

