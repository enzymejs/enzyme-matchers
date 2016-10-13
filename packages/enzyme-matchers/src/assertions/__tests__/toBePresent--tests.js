const { shallow } = require('enzyme');
const React = require('react');

const toBePresent = require('../toBePresent');

function Fixture() {
  return (
    <div>
      <span className="matches" />
    </div>
  );
}

describe('toBePresent', () => {
  const wrapper = shallow(<Fixture />);
  const truthyResults = toBePresent(wrapper.find('.matches'));
  const falsyResults = toBePresent(wrapper.find('.doesnt-matches'));

  it('returns the pass flag properly', () => {
    expect(truthyResults.pass).toBeTruthy();
    expect(falsyResults.pass).toBeFalsy();
  });

  it('returns the message with the proper pass/fail verbage', () => {
    expect(truthyResults.message).not.toContain('not');
    expect(falsyResults.message).toContain('not');
  });
});
