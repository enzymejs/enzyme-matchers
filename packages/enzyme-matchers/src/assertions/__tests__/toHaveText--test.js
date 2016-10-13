const { mount } = require('enzyme');
const React = require('react');

const toHaveText = require('../toHaveText');

function Fixture() {
  return (
    <div>
      <p id="full">Test</p>
      <p id="empty"></p>
    </div>
  );
}

describe('toHaveText', () => {
  const wrapper = mount(<Fixture />).find('#full');
  const truthyResults = toHaveText(wrapper, 'Test');
  const falsyResults = toHaveText(wrapper, 'Turdz');

  it('returns the pass flag properly', () => {
    expect(truthyResults.pass).toBeTruthy();
    expect(falsyResults.pass).toBeFalsy();
  });

  it('returns the message with the proper pass/fail verbage', () => {
    expect(truthyResults.message).not.toContain('not');
    expect(falsyResults.message).toContain('not');
  });
});
