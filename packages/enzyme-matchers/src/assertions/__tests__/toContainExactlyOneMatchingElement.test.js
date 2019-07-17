const PropTypes = require('prop-types');

const toContainExactlyOneMatchingElement = require('../toContainExactlyOneMatchingElement');

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
          <User index={1} className="userOne" />
        </li>
        <li>
          <User index={2} className="userTwo" />
        </li>
      </ul>
    </div>
  );
}

describe('toContainExactlyOneMatchingElement', () => {
  const wrapper = shallow(<Fixture />);
  const truthyResults = [
    toContainExactlyOneMatchingElement(wrapper, '.userOne'),
    toContainExactlyOneMatchingElement(wrapper, '[index=1]'),
    toContainExactlyOneMatchingElement(wrapper.find('ul'), '[index=1]'),
  ];
  const falsyResults = [
    toContainExactlyOneMatchingElement(wrapper, 'User'),
    toContainExactlyOneMatchingElement(wrapper, '.userThree'),
    toContainExactlyOneMatchingElement(wrapper, '[index]'),
    toContainExactlyOneMatchingElement(wrapper.find('ul'), '[index]'),
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
