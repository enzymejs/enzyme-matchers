const { shallow } = require('enzyme');
const React = require('react');
const toBeChecked = require('../toBeChecked');

function Fixture() {
  return (
    <div>
      <input id="checked" defaultChecked />
      <input id="not" defaultChecked={false} />
      <input id="tertiary" defaultChecked checked={false} />
    </div>
  );
}

describe('toBeChecked', () => {
  const wrapper = shallow(<Fixture />);
  const truthyResults = toBeChecked(wrapper.find('#checked'));
  const falsyResults = toBeChecked(wrapper.find('#not'));

  it('returns the pass flag properly', () => {
    expect(truthyResults.pass).toBeTruthy();
    expect(falsyResults.pass).toBeFalsy();
  });

  it('returns the message with the proper pass/fail verbage', () => {
    expect(truthyResults.message).not.toContain('not');
    expect(falsyResults.message).toContain('not');
  });
});

