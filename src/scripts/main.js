var bespoke = require('bespoke'),
  keys = require('bespoke-keys'),
  touch = require('bespoke-touch'),
  bullets = require('bespoke-bullets');

// Bespoke.js
bespoke.from('article', [
  keys(),
  touch(),
  bullets('li, .bullet')
]);

// Prism syntax highlighting
require('prism');
