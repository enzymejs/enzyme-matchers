const { mount } = require('enzyme');
const React = require('react');

const toMatchSelector = require('../toMatchSelector');

function Fixture() {
  return (
    <div>
      <span id="child" className="foo" />
    </div>
  );
}

describe('toMatchSelector', () => {
  const wrapper = mount(<Fixture />).find('#child');
  const truthyResults = toMatchSelector(wrapper, '#child');
  const falsyResults = toMatchSelector(wrapper, '.doesnt-match');

  it('returns the pass flag properly', () => {
    expect(truthyResults.pass).toBeTruthy();
    expect(falsyResults.pass).toBeFalsy();
  });

  it('returns the message with the proper pass/fail verbage', () => {
    expect(truthyResults.message).not.toContain('not');
    expect(falsyResults.message).toContain('not');
  });
});
