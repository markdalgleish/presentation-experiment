var bespoke = require('bespoke'),
  exampleTheme = require('./bespoke-theme-example/index.js'),
  vcr = require('bespoke-vcr'),
  keys = require('bespoke-keys'),
  touch = require('bespoke-touch'),
  bullets = require('bespoke-bullets'),
  scale = require('bespoke-scale'),
  hash = require('bespoke-hash'),
  progress = require('bespoke-progress'),
  forms = require('bespoke-forms'),
  loop = require('bespoke-loop');

// Bespoke.js
bespoke.from('article', [
  exampleTheme(),
  vcr(),
  keys(),
  touch(),
  bullets('li, .bullet'),
  scale(),
  hash(),
  progress(),
  forms(),
  loop()
]);

// Prism syntax highlighting
require('prism');
