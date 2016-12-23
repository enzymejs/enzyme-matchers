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
        const nwrapper = builder(<div><span /><span /></div>).find('span');
        const nfalsyResults = toHaveTagName(nwrapper, 'span');

        expect(nfalsyResults).toMatchSnapshot();
      });

      it('works on composite functions', () => {
        const nwrapper = builder(<Fixture />);
        const ntruthyResults = toHaveTagName(nwrapper, 'Fixture');
        const nfalsyResults = toHaveTagName(nwrapper, 'a');

        expect(ntruthyResults).toMatchSnapshot();
        expect(nfalsyResults).toMatchSnapshot();
      });
    });
  });
});
