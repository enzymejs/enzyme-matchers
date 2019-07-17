const PropTypes = require('prop-types');

const toContainMatchingElements = require('../toContainMatchingElements');

function User(props) {
  return (
    <span className={props.className}>
      User {props.index}
    </span>
  );
}

User.propTypes = {
  index: PropTypes.number.isRequired,
  className: PropTypes.string,
};

function Fixture() {
  return (
    <div>
      <ul>
        <li>
          <User index={1} className="userOne" />
        </li>
        <li>
          <User index={2} className="userTwo" />
        </li>
      </ul>
    </div>
  );
}

describe('toContainMatchingElements', () => {
  const wrapper = shallow(<Fixture />);
  const truthyResults = [
    toContainMatchingElements(wrapper, 2, 'User'),
    toContainMatchingElements(wrapper, 1, '[index=1]'),
    toContainMatchingElements(wrapper, 2, '[index]'),
    toContainMatchingElements(wrapper.find('ul'), 2, '[index]'),
    toContainMatchingElements(wrapper.find('User'), 1, '[index=1]'),
  ];
  const falsyResults = [
    toContainMatchingElements(wrapper, 3, 'User'),
    toContainMatchingElements(wrapper, 1, '.userThree'),
    toContainMatchingElements(wrapper, 1, '[index]'),
    toContainMatchingElements(wrapper.find('ul'), 3, '[index]'),
  ];

  it('returns the pass flag properly', () => {
    truthyResults.forEach(truthyResult => {
      expect(truthyResult.pass).toBe(true);
    });
    falsyResults.forEach(falsyResult => {
      expect(falsyResult.pass).toBe(false);
    });
  });

  it('returns the message with the proper pass verbage', () => {
    truthyResults.forEach(truthyResult => {
      expect(truthyResult.message).toMatchSnapshot();
    });
  });

  it('returns the message with the proper fail verbage', () => {
    falsyResults.forEach(falsyResult => {
      expect(falsyResult.negatedMessage).toMatchSnapshot();
    });
  });

  it('provides contextual information for the message', () => {
    truthyResults.forEach(truthyResult => {
      expect(truthyResult.contextualInformation).toMatchSnapshot();
    });
  });
});
