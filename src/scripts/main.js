var bespoke = require('bespoke'),
  keys = require('bespoke-keys'),
  touch = require('bespoke-touch'),
  bullets = require('bespoke-bullets'),
  scale = require('bespoke-scale'),
  hash = require('bespoke-hash'),
  progress = require('bespoke-progress');

// Bespoke.js
bespoke.from('article', [
  keys(),
  touch(),
  bullets('li, .bullet'),
  scale(),
  hash(),
  progress()
]);

// Prism syntax highlighting
require('prism');
