const { mount } = require('enzyme');
const React = require('react');

const toHaveStyle = require('../toHaveStyle');

function Fixture() {
  const style1 = { height: '100%' };
  const style2 = { flex: 8 };

  return (
    <div>
      <span id="style1" style={style1} />
      <span id="style2" style={style2} />
    </div>
  );
}

describe('toHaveStyle', () => {
  const wrapper = mount(<Fixture />).find('#style1');
  const truthyResults = toHaveStyle(wrapper, 'height', '100%');
  const falsyResults = toHaveStyle(wrapper, 'height', '0');

  it('returns the pass flag properly', () => {
    expect(truthyResults.pass).toBeTruthy();
    expect(falsyResults.pass).toBeFalsy();
  });

  it('returns the message with the proper pass/fail verbage', () => {
    expect(truthyResults.message).not.toContain('not');
    expect(falsyResults.message).toContain('not');
  });
});
