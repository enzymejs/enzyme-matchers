const { shallow } = require('enzyme');
const React = require('react');

const toHaveHTML = require('../toHaveHTML');

function Fixture() {
  return (
    <div id="root">
      <span id="child">Test</span>
    </div>
  );
}

const html = '<span id="child">Test</span>';

describe('toHaveHTML', () => {
  const wrapper = shallow(<Fixture />);
  const truthyResults = toHaveHTML(wrapper.find('#child'), html);
  const falsyResults = toHaveHTML(wrapper.find('#child'), 'foo');

  it('returns the pass flag properly', () => {
    expect(truthyResults.pass).toBeTruthy();
    expect(falsyResults.pass).toBeFalsy();
  });

  it('returns the message with the proper pass/fail verbage', () => {
    expect(truthyResults.message).not.toContain('not');
    expect(falsyResults.message).toContain('not');
  });
});
