const toHaveText = require('../toHaveText');

function Fixture() {
  return (
    <div>
      <p id="full">Test</p>
      <p id="empty" />
    </div>
  );
}

describe('toHaveText', () => {
  [shallow, mount].forEach(builder => {
    describe(builder.name, () => {
      const wrapper = builder(<Fixture />).find('#full');
      const truthyResults = toHaveText(wrapper, 'Test');
      const falsyResults = toHaveText(wrapper, 'Turdz');

      it('returns the pass flag properly', () => {
        expect(truthyResults.pass).toBe(true);
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
