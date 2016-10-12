const React = require('react');

function User(props) {
  return (
    <div>
      {props.name}
    </div>
  );
}

User.propTypes = {
  name: React.PropTypes.string,
};

export default function Fixture() {
  return (
    <div>
      <User
        name="blaine"
      />
    </div>
  );
}
