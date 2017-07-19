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
    React.createElement('span', { id: 'span' }),
    React.createElement('span', null),
    React.createElement('a', { id: 'a' }),
  );
}
module.exports = exports['default'];
