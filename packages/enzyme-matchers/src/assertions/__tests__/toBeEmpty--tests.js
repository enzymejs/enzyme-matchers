const { shallow } = require('enzyme');
const React = require('react');

const toBeEmpty = require('../toBeEmpty');

function Fixture() {
  return (
    <div>
      <span className="matches" />
    </div>
  );
}

describe('toBeEmpty', () => {
  const wrapper = shallow(<Fixture />);
  const truthyResults = toBeEmpty(wrapper.find('.doesnt-match'));
  const falsyResults = toBeEmpty(wrapper.find('.matches'));

  it('returns the pass flag properly', () => {
    expect(truthyResults.pass).toBeTruthy();
    expect(falsyResults.pass).toBeFalsy();
  });

  it('returns the message with the proper pass/fail verbage', () => {
    expect(truthyResults.message).not.toContain('not');
    expect(falsyResults.message).toContain('not');
  });
});
