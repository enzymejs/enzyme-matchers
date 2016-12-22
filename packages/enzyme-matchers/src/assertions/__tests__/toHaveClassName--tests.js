const { shallow, mount } = require('enzyme');
const React = require('react');

const toHaveClassName = require('../toHaveClassName');

function Fixture() {
  return (
    <div>
      <span className="foo" />
      <span className="bar baz" />
      <span className="baux" />
      <span className="baux" />
    </div>
  );
}

describe('toHaveClassName', () => {
  [shallow, mount].forEach(builder => {
    describe(builder.name, () => {
      const wrapper = builder(<Fixture />);
      const truthyResults = toHaveClassName(wrapper.find('.bar'), 'bar');
      const falsyResults = toHaveClassName(wrapper.find('.bar'), 'asldfkj');

      it('returns the pass flag properly', () => {
        expect(truthyResults.pass).toBeTruthy();
        expect(falsyResults.pass).toBeFalsy();
      });

      it(`returns the message with the proper pass verbage (${builder.name})`, () => {
        expect(truthyResults.message).toMatchSnapshot();
      });

      it(`returns the message with the proper fail verbage (${builder.name})`, () => {
        expect(truthyResults.negatedMessage).toMatchSnapshot();
      });

      it(`provides contextual information for the message (${builder.name})`, () => {
        expect(truthyResults.contextualInformation).toMatchSnapshot();
      });

      it(`works for multiple nodes (${builder.name})`, () => {
        const multipleNodes = wrapper.find('.baux');

        const results = toHaveClassName(multipleNodes, 'baux');

        expect(results).toMatchSnapshot();
      });
    });
  });
});
