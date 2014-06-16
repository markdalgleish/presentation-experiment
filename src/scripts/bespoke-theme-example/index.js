// TODO: Make this a standalone module?
var prependCss = (function() {
  var inserted = {};

  return function(css) {
    if (inserted[css]) return;
    inserted[css] = true;

    var elem = document.createElement('style');
    elem.setAttribute('type', 'text/css');

    if ('textContent' in elem) {
      elem.textContent = css;
    } else {
      elem.styleSheet.cssText = css;
    }

    var head = document.getElementsByTagName('head')[0];
    head.insertBefore(elem, head.children[0]);
  };
}());

var fs = require('fs');
var classes = require('../bespoke-classes');

module.exports = function() {
  return function(deck) {
    classes()(deck);
    var css = fs.readFileSync(__dirname + '/theme.css', 'utf8');
    prependCss(css);
  };
};
