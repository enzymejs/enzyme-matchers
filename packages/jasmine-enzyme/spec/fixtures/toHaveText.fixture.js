'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = Fixture;
var React = require('react');

function Fixture() {
  return React.createElement(
    'div',
    null,
    React.createElement('p', { id: 'full' }, 'Test'),
    React.createElement('p', { id: 'empty' }),
  );
}
module.exports = exports['default'];
