var bespoke = require('bespoke'),
  keys = require('bespoke-keys'),
  touch = require('bespoke-touch'),
  bullets = require('bespoke-bullets'),
  scale = require('bespoke-scale');

// Bespoke.js
bespoke.from('article', [
  keys(),
  touch(),
  bullets('li, .bullet'),
  scale()
]);

// Prism syntax highlighting
require('prism');
