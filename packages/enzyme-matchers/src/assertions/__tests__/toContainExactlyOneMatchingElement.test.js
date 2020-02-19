const PropTypes = require('prop-types');
const getNodeName = require('../../utils/name');
const toContainExactlyOneMatchingElement = require('../toContainExactlyOneMatchingElement');

function User(props) {
  return (
    <span>
      User <span data-index={`value-${props.index}`}>{props.index}</span>
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
  [shallow, mount].forEach(renderer => {
    describe(`with a ${renderer.name} wrapper`, () => {
      const wrapper = renderer(<Fixture />);
      const argsToTest = [
        [wrapper, '.userOne', true],
        [wrapper, 'User', false],
        [wrapper, '[index=1]', true],
        [wrapper, '[index]', false],
        [wrapper.find('ul'), '[index]', false],
        [wrapper.find('User'), '[index=1]', true],
        [wrapper, '.userThree', false],
        [wrapper, '[data-index="value-1"]', renderer === mount],
      ];

      argsToTest.forEach(([currentWrapper, selector, expectedResult]) => {
        const result = toContainExactlyOneMatchingElement(
          currentWrapper,
          selector
        );
        it(`returns ${expectedResult} for "${selector}" in <${getNodeName(
          currentWrapper
        )}>`, () => {
          expect(result.pass).toBe(expectedResult);
        });

        it(`returns the proper verbage for "${selector}"`, () => {
          if (expectedResult) {
            expect(result.message).toMatchSnapshot();
          } else {
            expect(result.negatedMessage).toMatchSnapshot();
          }
        });

        it('provides contextual information for the message', () => {
          expect(result.contextualInformation).toMatchSnapshot();
        });
      });
    });
  });
});
