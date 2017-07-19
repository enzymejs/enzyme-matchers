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
    React.createElement('input', { id: 'checked', defaultChecked: true }),
    React.createElement('input', { id: 'not', defaultChecked: false }),
    React.createElement('input', {
      id: 'tertiary',
      defaultChecked: true,
      checked: false,
    }),
  );
}
module.exports = exports['default'];
