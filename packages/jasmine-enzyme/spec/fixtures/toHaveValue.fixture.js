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
    React.createElement('input', { defaultValue: 'test' }),
    React.createElement('input', {
      defaultValue: 'foo',
      value: 'bar',
      onChange: function noop() {},
    }),
  );
}
module.exports = exports['default'];
