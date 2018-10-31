const PropTypes = require('prop-types');

const toContainReact = require('../toContainReact');

function User(props) {
  return (
    <span>
      User {props.index}
    </span>
  );
}

User.propTypes = {
  index: PropTypes.number.isRequired,
};

function Fixture() {
  return (
    <div>
      <ul>
        <li>
          <User index={1} />
        </li>
        <li>
          <User index={2} />
        </li>
      </ul>
    </div>
  );
}

describe('toContainReact', () => {
  const wrapper = shallow(<Fixture />);
  const truthyResults = toContainReact(wrapper, <User index={1} />);
  const falsyResults = toContainReact(wrapper, <User index={3} />);

  it('returns the pass flag properly', () => {
    expect(truthyResults.pass).toBe(true);
    expect(falsyResults.pass).toBe(false);
  });

  it('returns the message with the proper pass verbage', () => {
    expect(truthyResults.message).toMatchSnapshot();
  });

  it('returns the message with the proper fail verbage', () => {
    expect(truthyResults.negatedMessage).toMatchSnapshot();
  });

  it('provides contextual information for the message', () => {
    expect(truthyResults.contextualInformation).toMatchSnapshot();
  });
});
