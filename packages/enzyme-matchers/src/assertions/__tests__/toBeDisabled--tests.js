const { shallow } = require('enzyme');
const React = require('react');

const toBeDisabled = require('../toBeDisabled');

function Fixture() {
  return (
    <div>
      <input id="disabled" disabled />
      <input id="not" />
    </div>
  );
}

describe('toBeDisabled', () => {
  const wrapper = shallow(<Fixture />);
  const truthyResults = toBeDisabled(wrapper.find('#disabled'));
  const falsyResults = toBeDisabled(wrapper.find('#not'));

  it('returns the pass flag properly', () => {
    expect(truthyResults.pass).toBeTruthy();
    expect(falsyResults.pass).toBeFalsy();
  });

  it('returns the message with the proper pass verbage', () => {
    expect(truthyResults.message).toMatchSnapshot();
  });

  it('returns the message with the proper pass verbage', () => {
    expect(truthyResults.negatedMessage).toMatchSnapshot();
  });

  it('provides contextual information for the message', () => {
    expect(truthyResults.contextualInformation).toMatchSnapshot();
  });
});
