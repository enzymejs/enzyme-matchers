const { shallow, mount } = require('enzyme');
const React = require('react');

const toHaveValue = require('../toHaveValue');

function Fixture() {
  return (
    <div>
      <input defaultValue="test" />
      <input defaultValue="foo" value="bar" onChange={jest.genMockFunction()} />
    </div>
  );
}

describe('toHaveValue', () => {
  it('prioritizes `value` over `defaultValue`', () => {
    const wrapper = shallow(<Fixture />).find('input').at(1);
    expect(
      toHaveValue(wrapper, 'bar').pass
    ).toBeTruthy();

    expect(
      toHaveValue(wrapper, 'foo').pass
    ).toBeFalsy();
  });

  it('returns the pass flag properly', () => {
    const wrapper = mount(<Fixture />).find('input').first();
    const truthyResults = toHaveValue(wrapper, 'test');
    const falsyResults = toHaveValue(wrapper, 'Turdz');

    expect(truthyResults.pass).toBeTruthy();
    expect(falsyResults.pass).toBeFalsy();
  });

  it('returns the message with the proper pass/fail verbage', () => {
    const wrapper = mount(<Fixture />).find('input').first();
    const truthyResults = toHaveValue(wrapper, 'test');
    const falsyResults = toHaveValue(wrapper, 'Turdz');

    expect(truthyResults.message).not.toContain('not');
    expect(falsyResults.message).toContain('not');
  });
});
