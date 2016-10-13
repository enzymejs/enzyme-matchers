const { shallow } = require('enzyme');
const React = require('react');

const toHaveClassName = require('../toHaveClassName');

function Fixture() {
  return (
    <div>
      <span className="foo" />
      <span className="bar baz" />
    </div>
  );
}

describe('toHaveClassName', () => {
  const wrapper = shallow(<Fixture />);
  const truthyResults = toHaveClassName(wrapper.find('.bar'), 'bar');
  const falsyResults = toHaveClassName(wrapper.find('.bar'), 'asldfkj');

  it('returns the pass flag properly', () => {
    expect(truthyResults.pass).toBeTruthy();
    expect(falsyResults.pass).toBeFalsy();
  });

  it('returns the message with the proper pass/fail verbage', () => {
    expect(truthyResults.message).not.toContain('not');
    expect(falsyResults.message).toContain('not');
  });
});
