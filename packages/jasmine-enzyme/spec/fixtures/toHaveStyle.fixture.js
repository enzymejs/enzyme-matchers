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
    React.createElement('span', { id: 'style1', style: { height: '100%' } }),
    React.createElement('span', { id: 'style2', style: { flex: 8 } }),
  );
}
module.exports = exports['default'];
