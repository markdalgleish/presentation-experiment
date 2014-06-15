var bespoke = require('bespoke'),
  keys = require('bespoke-keys'),
  touch = require('bespoke-touch'),
  bullets = require('bespoke-bullets'),
  scale = require('bespoke-scale'),
  hash = require('bespoke-hash');

// Bespoke.js
bespoke.from('article', [
  keys(),
  touch(),
  bullets('li, .bullet'),
  scale(),
  hash()
]);

// Prism syntax highlighting
require('prism');
