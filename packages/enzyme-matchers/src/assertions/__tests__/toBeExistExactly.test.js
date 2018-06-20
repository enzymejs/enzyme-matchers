const toExistExactly = require('../toExistExactly');

function Fixture() {
  return (
    <div>
      <span className="matches" />
    </div>
  );
}

describe('toExistExactly', () => {
  const wrapper = shallow(<Fixture />);
  const matchingNodes = wrapper.find('.matches');

  describe('when no number provided', () => {
    it('fails', () => {
      const { pass } = toExistExactly(matchingNodes);

      expect(pass).toBe(false);
    });

    it('gives proper message', () => {
      const { message } = toExistExactly(matchingNodes);

      expect(message).toBe('Expected a number of elements to be defined');
    });
  });

  describe('when number is given', () => {
    it('passes when the number matches number of elements', () => {
      const { pass } = toExistExactly(matchingNodes, 1);

      expect(pass).toBe(true);
    });

    it("fails when the number doesn't match number of elements", () => {
      const { pass } = toExistExactly(matchingNodes, 2);

      expect(pass).toBe(false);
    });

    it('gives proper messsage when failing', () => {
      const { message } = toExistExactly(matchingNodes, 2);

      expect(message).toBe('Expected 2 nodes, instead found 1');
    });

    it('gives proper negated message when failing', () => {
      const { negatedMessage } = toExistExactly(matchingNodes, 2);

      expect(negatedMessage).toBe(
        'Expected not to find 2 nodes, but exactly that many were found'
      );
    });

    it('provides contextual information for when any elements found', () => {
      const { contextualInformation } = toExistExactly(matchingNodes, 2);

      expect(contextualInformation).toEqual({
        actual: 'Found Nodes: <span className="matches" />',
      });
    });

    it("doesn't provide contextual information for when no elements found", () => {
      const { contextualInformation } = toExistExactly(
        shallow(<div />).find('.matches'),
        1
      );

      expect(contextualInformation).toEqual({});
    });
  });
});
