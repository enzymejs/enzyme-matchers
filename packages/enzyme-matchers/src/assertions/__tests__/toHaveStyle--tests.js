const { mount, shallow } = require('enzyme');
const React = require('react');

const toHaveStyle = require('../toHaveStyle');

function Fixture() {
  const style1 = { height: '100%' };

  return (
    <div>
      <span id="style1" style={style1} />
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

      it("provides the right info when a specific key doesn't exist", () => {
        const style = { width: '0' };
        const nwrapper = builder(<div style={style} />);
        const nfalsyResults = toHaveStyle(nwrapper, 'height', '0');

        expect(nfalsyResults).toMatchSnapshot();
      });
    });

    describe(`${builder.name} - array of styles`, () => {
      it('should merge style objects', () => {
        const style1 = { width: 10 };
        const style2 = { height: 20 };

        const wrapper = builder(<div style={[style1, style2]} />);

        const widthResult = toHaveStyle(wrapper, 'width', 10);
        const heightResult = toHaveStyle(wrapper, 'height', 20);

        expect(widthResult.pass).toBeTruthy();
        expect(heightResult.pass).toBeTruthy();
      });

      it('should override style properties', () => {
        const style1 = { backgroundColor: '#000', width: 10 };
        const style2 = { backgroundColor: '#023c69', width: null };

        const wrapper = builder(<div style={[style1, style2]} />);

        const colorResult = toHaveStyle(wrapper, 'backgroundColor', '#023c69');
        const widthResult = toHaveStyle(wrapper, 'width', null);

        expect(colorResult.pass).toBeTruthy();
        expect(widthResult.pass).toBeTruthy();
      });

      it('should overwrite properties with `undefined`', () => {
        const style1 = { backgroundColor: '#000' };
        const style2 = { backgroundColor: undefined };

        const wrapper = builder(<div style={[style1, style2]} />);

        const colorResult = toHaveStyle(wrapper, 'backgroundColor', undefined);

        expect(colorResult.pass).toBeTruthy();
      });

      it('should recursively flatten arrays', () => {
        const style1 = { width: 10 };
        const style2 = { height: 20 };
        const style3 = { width: 30 };

        const wrapper = builder(
          <div style={[null, [], [style1, style2], style3]} />
        );

        const widthResult = toHaveStyle(wrapper, 'width', 30);
        const heightResult = toHaveStyle(wrapper, 'height', 20);

        expect(widthResult.pass).toBeTruthy();
        expect(heightResult.pass).toBeTruthy();
      });
    });
  });
});
