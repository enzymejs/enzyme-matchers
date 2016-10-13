const { shallow } = require('enzyme');
const React = require('react');

const toContainReact = require('../toContainReact');

function User(props) {
  return (
    <span>User {props.index}</span>
  );
}

User.propTypes = {
  index: React.PropTypes.number.isRequired,
};

function Fixture() {
  return (
    <div>
      <ul>
        <li><User index={1} /></li>
        <li><User index={2} /></li>
      </ul>
    </div>
  );
}

describe('toContainReact', () => {
  const wrapper = shallow(<Fixture />);
  const truthyResults = toContainReact(wrapper, <User index={1} />);
  const falsyResults = toContainReact(wrapper, <User index={3} />);

  it('returns the pass flag properly', () => {
    expect(truthyResults.pass).toBeTruthy();
    expect(falsyResults.pass).toBeFalsy();
  });

  it('returns the message with the proper pass/fail verbage', () => {
    expect(truthyResults.message).not.toContain('not');
    expect(falsyResults.message).toContain('not');
  });
});
