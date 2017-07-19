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
    React.createElement('span', { className: 'foo' }),
    React.createElement('span', { className: 'bar baz' }),
  );
}
module.exports = exports['default'];
