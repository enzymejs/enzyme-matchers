'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.User = User;
exports.Fixture = Fixture;
var React = require('react');
var PropTypes = require('prop-types');

function User(props) {
  return React.createElement('span', null, 'User ', props.index);
}

User.propTypes = {
  index: PropTypes.number.isRequired,
};

function Fixture() {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'ul',
      null,
      React.createElement('li', null, React.createElement(User, { index: 1 })),
      React.createElement('li', null, React.createElement(User, { index: 2 })),
    ),
  );
}
