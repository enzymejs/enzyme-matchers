const { mount, shallow } = require('enzyme');
const React = require('react');

const toHaveStyle = require('../toHaveStyle');

function Fixture() {
  const style1 = { height: '100%' };
  const style2 = { flex: 8 };

  return (
    <div>
      <span id="style1" style={style1} />
      <span id="style2" style={style2} />
    </div>
  );
}

describe('toHaveStyle', () => {
  [shallow, mount].forEach(builder => {
    describe(builder.name, () => {
      const wrapper = builder(<Fixture />).find('#style1');
      const truthyResults = toHaveStyle(wrapper, 'height', '100%');
      const falsyResults = toHaveStyle(wrapper, 'height', '0');

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

      it('provides the right info for if there is no style prop', () => {
        const nwrapper = builder(<div />);
        const nfalsyResults = toHaveStyle(nwrapper, 'height', '0');

        expect(nfalsyResults).toMatchSnapshot();
      });

      it('provides the right info when a specific key doesn\'t exist', () => {
        const style = { width: '0' };
        const nwrapper = builder(<div style={style} />);
        const nfalsyResults = toHaveStyle(nwrapper, 'height', '0');

        expect(nfalsyResults).toMatchSnapshot();
      });
    });
  });
});
