var bespoke = require('bespoke'),
  cubeTheme = require('bespoke-theme-cube'),
  vcr = require('bespoke-vcr'),
  keys = require('bespoke-keys'),
  touch = require('bespoke-touch'),
  bullets = require('bespoke-bullets'),
  scale = require('bespoke-scale'),
  state = require('bespoke-state'),
  hash = require('bespoke-hash'),
  progress = require('bespoke-progress'),
  forms = require('bespoke-forms'),
  loop = require('bespoke-loop');

// Bespoke.js
bespoke.from('article', [
  cubeTheme(),
  vcr(),
  keys(),
  touch(),
  bullets('li, .bullet'),
  scale(),
  state(),
  hash(),
  progress(),
  forms(),
  loop()
]);

// Prism syntax highlighting
// Note: This is loaded from "bower_components" thanks to debowerify
require('prism');
