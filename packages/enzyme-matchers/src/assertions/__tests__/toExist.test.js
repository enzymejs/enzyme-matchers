const React = require('react');
const toExist = require('../toExist');

function Fixture() {
  return (
    <div>
      <span className="matches" />
    </div>
  );
}

describe('toExist', () => {
  const wrapper = shallow(<Fixture />);
  const truthyResults = toExist(wrapper.find('.matches'));
  const falsyResults = toExist(wrapper.find('.doesnt-matches'));

  it('returns the pass flag properly', () => {
    expect(truthyResults.pass).toBe(true);
    expect(falsyResults.pass).toBe(false);
  });

  it('returns the message with the proper pass verbage', () => {
    expect(truthyResults.message).toMatchSnapshot();
  });

  it('returns the message with the proper fail verbage', () => {
    expect(truthyResults.negatedMessage).toMatchSnapshot();
  });

  it('provides contextual information for the message', () => {
    expect(truthyResults.contextualInformation).toMatchSnapshot();
    expect(falsyResults.contextualInformation).toMatchSnapshot();
  });

  it('works for Fragments', () => {
    function Test() {
      return (
        <React.Fragment>
          <div>1</div>
          <div>2</div>
        </React.Fragment>
      );
    }

    const result = toExist(shallow(<Test />));
    expect(result.pass).toBe(true);
  });
});
