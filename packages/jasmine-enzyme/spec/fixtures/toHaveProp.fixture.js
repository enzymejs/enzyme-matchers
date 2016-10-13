"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Fixture;
var React = require('react');

function User(props) {
  return React.createElement(
    "div",
    null,
    props.name
  );
}

User.propTypes = {
  name: React.PropTypes.string
};

function Fixture() {
  return React.createElement(
    "div",
    null,
    React.createElement(User, {
      name: "blaine"
    })
  );
}
module.exports = exports['default'];
