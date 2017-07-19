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
    React.createElement('input', { id: 'disabled', disabled: true }),
    React.createElement('input', { id: 'not' }),
  );
}
module.exports = exports['default'];
