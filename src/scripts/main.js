var bespoke = require('./bespoke'),
  keys = require('./bespoke-keys'),
  touch = require('./bespoke-touch');

// Bespoke.js
bespoke.from('article', [
  keys(),
  touch()
]);

// Prism syntax highlighting
require('prism');
