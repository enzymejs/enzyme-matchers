const { shallow, mount } = require('enzyme');
const React = require('react');

const toHaveTagName = require('../toHaveTagName');

function Fixture() {
  return (
    <div>
      <span id="span" />
      <span />
      <a id="a" />
    </div>
  );
}

describe('toHaveTagName', () => {
  it('gives a specific error when trying to find for multiple nodes', () => {
    const wrapper = shallow(<Fixture />);

    const result = toHaveTagName(wrapper.find('span'), 'span');

    expect(result.pass).toBeFalsy();
    expect(result.message).toBe(
      'Cannot verify tag name on a wrapper of multiple nodes. Found 2 nodes.'
    );
  });

  it('returns the pass flag properly', () => {
    const wrapper = mount(<Fixture />).find('a');
    const truthyResults = toHaveTagName(wrapper, 'a');
    const falsyResults = toHaveTagName(wrapper, 'span');

    expect(truthyResults.pass).toBeTruthy();
    expect(falsyResults.pass).toBeFalsy();
  });

  it('returns the message with the proper pass/fail verbage', () => {
    const wrapper = mount(<Fixture />).find('a');
    const truthyResults = toHaveTagName(wrapper, 'a');
    const falsyResults = toHaveTagName(wrapper, 'span');

    expect(truthyResults.message).not.toContain('not');
    expect(falsyResults.message).toContain('not');
  });
});
