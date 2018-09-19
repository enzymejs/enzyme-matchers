const PropTypes = require('prop-types');

const toContainMatchingElement = require('../toContainMatchingElement');

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

describe('toContainMatchingElement', () => {
  const wrapper = shallow(<Fixture />);
  const truthyResults = [
    toContainMatchingElement(wrapper, 'User'),
    toContainMatchingElement(wrapper, '[index=1]'),
    toContainMatchingElement(wrapper, '[index]'),
  ];
  const falsyResults = [
    toContainMatchingElement(wrapper, 'Foo'),
    toContainMatchingElement(wrapper, '.userThree'),
  ];

  it('returns the pass flag properly', () => {
    truthyResults.forEach(truthyResult => {
      expect(truthyResult.pass).toBeTruthy();
    });
    falsyResults.forEach(falsyResult => {
      expect(falsyResult.pass).toBeFalsy();
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
