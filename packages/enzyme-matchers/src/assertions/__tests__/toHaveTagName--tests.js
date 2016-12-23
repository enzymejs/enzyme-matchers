const { shallow, mount } = require('enzyme');
const React = require('react');

const toHaveTagName = require('../toHaveTagName');

function Fixture() {
  return (
    <div>
      <span id="span" />
      <span />
      <a id="a" />
    </div>
  );
}

describe('toHaveTagName', () => {
  [shallow, mount].forEach(builder => {
    describe(builder.name, () => {
      const wrapper = builder(<Fixture />).find('a');
      const truthyResults = toHaveTagName(wrapper, 'a');
      const falsyResults = toHaveTagName(wrapper, 'span');

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

      it('provides the right info for when this method is called with multiple nodes', () => {
        const wrapper = builder(<div><span /><span /></div>).find('span');
        const falsyResults = toHaveTagName(wrapper, 'span');

        expect(falsyResults).toMatchSnapshot();
      });

      it('works on composite functions', () => {
        const wrapper = builder(<Fixture />);
        const truthyResults = toHaveTagName(wrapper, 'Fixture');
        const falsyResults = toHaveTagName(wrapper, 'a');

        expect(truthyResults).toMatchSnapshot();
        expect(falsyResults).toMatchSnapshot();
      });
    });
  });
});
