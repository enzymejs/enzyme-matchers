'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.Fixture = Fixture;
var React = require('react');

function Fixture() {
  return React.createElement(
    'div',
    { id: 'root' },
    React.createElement('span', { id: 'child' }, 'Test'),
  );
}

var html = (exports.html = '<span id="child">Test</span>');
