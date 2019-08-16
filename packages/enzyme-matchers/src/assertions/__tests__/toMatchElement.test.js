const toMatchElement = require('../toMatchElement');

function Fixture() {
  return (
    <div>
      <span id="child" className="foo" />
    </div>
  );
}

describe('toMatchElement', () => {
  [shallow, mount].forEach(builder => {
    describe(builder.name, () => {
      const wrapper = builder(<Fixture />);
      const truthyResults = toMatchElement(wrapper, <Fixture />);
      const truthyResultsMatchSpan = toMatchElement(
        wrapper.find('span'),
        <span id="child" className="foo" />
      );
      const falsyResults = toMatchElement(wrapper, <div />);
      const truthyResultsIncludeProps = toMatchElement(wrapper, <Fixture />, {
        ignoreProps: false,
      });

      it('returns the pass flag properly', () => {
        expect(truthyResults.pass).toBe(true);
        expect(truthyResultsMatchSpan.pass).toBe(true);
        expect(falsyResults.pass).toBe(false);
        expect(truthyResultsIncludeProps.pass).toBe(true);
      });

      it('returns the message with the proper pass verbage', () => {
        expect(truthyResults.message).toMatchSnapshot();
        expect(truthyResultsMatchSpan.message).toMatchSnapshot();
        expect(falsyResults.message).toMatchSnapshot();
        expect(truthyResultsIncludeProps.message).toMatchSnapshot();
      });

      it('returns the message with the proper fail verbage', () => {
        expect(truthyResults.negatedMessage).toMatchSnapshot();
        expect(truthyResultsMatchSpan.negatedMessage).toMatchSnapshot();
        expect(falsyResults.negatedMessage).toMatchSnapshot();
        expect(truthyResultsIncludeProps.negatedMessage).toMatchSnapshot();
      });

      it('provides contextual information for the message', () => {
        expect(truthyResults.contextualInformation).toMatchSnapshot();
        expect(truthyResultsMatchSpan.contextualInformation).toMatchSnapshot();
        expect(falsyResults.contextualInformation).toMatchSnapshot();
        expect(
          truthyResultsIncludeProps.contextualInformation
        ).toMatchSnapshot();
      });
    });

    it('Supports props that are of object shape', () => {
      // eslint-disable-next-line react/prop-types
      function ArrayFixture({ prop }) {
        return (
          <div>
            <span data-json={prop} />
          </div>
        );
      }

      const wrapper = builder(<ArrayFixture prop={[1, 2, 3]} />);
      const failedResults = toMatchElement(
        wrapper.find('span'),
        <span data-json={[1, 2]} />,
        { ignoreProps: false }
      );
      const passResults = toMatchElement(
        wrapper.find('span'),
        <span data-json={[1, 2, 3]} />,
        { ignoreProps: false }
      );

      expect(failedResults.pass).toBe(false);
      expect(passResults.pass).toBe(true);
    });
  });
});
