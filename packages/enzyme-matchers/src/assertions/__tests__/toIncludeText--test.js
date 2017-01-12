const { mount } = require('enzyme');
const React = require('react');

const toIncludeText = require('../toIncludeText');

function Fixture() {
  return (
    <div>
      <p id="full">Some important text</p>
    </div>
  );
}

describe('toIncludeText', () => {
  const wrapper = mount(<Fixture />).find('#full');
  const truthyResults = toIncludeText(wrapper, 'important');
  const falsyResults = toIncludeText(wrapper, 'nope');
  const undefinedResults = toIncludeText(wrapper, undefined);

  it('returns the pass flag properly', () => {
    expect(truthyResults.pass).toBeTruthy();
    expect(falsyResults.pass).toBeFalsy();
    expect(undefinedResults.pass).toBeFalsy();
  });

  it('returns the message with the proper pass/fail verbage', () => {
    expect(truthyResults.message).not.toContain('not');
    expect(falsyResults.message).toContain('not');
    expect(undefinedResults.message).toContain('not');
  });
});
