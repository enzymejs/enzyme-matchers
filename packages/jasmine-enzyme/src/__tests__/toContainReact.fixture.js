const React = require('react');

export function User(props) {
  return (
    <span>User {props.index}</span>
  );
}

User.propTypes = {
  index: React.PropTypes.number.isRequired,
};

export function Fixture() {
  return (
    <div>
      <ul>
        <li><User index={1} /></li>
        <li><User index={2} /></li>
      </ul>
    </div>
  );
}
