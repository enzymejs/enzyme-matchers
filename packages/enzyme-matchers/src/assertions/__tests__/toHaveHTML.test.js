const toHaveHTML = require('../toHaveHTML');

function Fixture() {
  return (
    <div id="root">
      <span id="child">
        <b>Test</b>
      </span>
    </div>
  );
}

const html = '<span id="child"><b>Test</b></span>';

const multilineHtml = `<span id="child">
    <b>Test</b>
  </span>`;

describe('toHaveHTML', () => {
  [shallow, mount].forEach(builder => {
    describe(builder.name, () => {
      const wrapper = builder(<Fixture />);
      const truthyResults = toHaveHTML(wrapper.find('#child'), html);
      const truthyMultilineResults = toHaveHTML(
        wrapper.find('#child'),
        multilineHtml
      );
      const falsyResults = toHaveHTML(wrapper.find('#child'), 'foo');

      it('returns the pass flag properly', () => {
        expect(truthyResults.pass).toBe(true);
        expect(truthyMultilineResults.pass).toBe(true);
        expect(falsyResults.pass).toBe(false);
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
    });
  });
});
