'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = Fixture;
var React = require('react');
var PropTypes = require('prop-types');

function User(props) {
  return React.createElement('div', null, props.name);
}

User.propTypes = {
  name: PropTypes.string,
};

function Fixture() {
  return React.createElement(
    'div',
    null,
    React.createElement(User, {
      name: 'blaine',
    }),
  );
}
module.exports = exports['default'];
