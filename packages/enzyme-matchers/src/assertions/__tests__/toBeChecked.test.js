const toBeChecked = require('../toBeChecked');

function Fixture() {
  return (
    <div>
      <input id="checked" defaultChecked />
      <input id="not" defaultChecked={false} />
      <input id="precedence" defaultChecked={false} checked />
      <input id="safe" />
    </div>
  );
}

describe('toBeChecked', () => {
  const wrapper = shallow(<Fixture />);
  const truthyResults = toBeChecked(wrapper.find('#checked'));
  const falsyResults = toBeChecked(wrapper.find('#not'));

  it('returns the pass flag properly', () => {
    expect(truthyResults.pass).toBe(true);
    expect(falsyResults.pass).toBe(false);
  });

  it('returns the message with the proper pass verbage', () => {
    expect(truthyResults.message).toMatchSnapshot();
  });

  it('returns the negatedMessage with the proper fail verbage', () => {
    expect(truthyResults.negatedMessage).toMatchSnapshot();
  });

  it('provides contextual information for the message', () => {
    expect(truthyResults.contextualInformation).toMatchSnapshot();
  });

  it('`checked` should take precedence over `defaultChecked`', () => {
    const result = toBeChecked(wrapper.find('#precedence'));

    expect(result.pass).toBe(true);
  });

  it('should not fail on undefined values', () => {
    const result = toBeChecked(wrapper.find('#safe'));

    expect(result.pass).toBe(false);
  });
});
