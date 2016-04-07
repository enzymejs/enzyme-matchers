const { shallow, mount } = require('enzyme');
const React = require('react');

function Fixture() {
  return (
    <div>
      <input defaultValue="test" />
      <input defaultValue="foo" value="bar" onChange={jest.genMockFunction()} />
    </div>
  );
}

describe('toHaveValue', () => {
  it('works with `shallow` renders', () => {
    const wrapper = shallow(<Fixture />);
    expect(wrapper.find('input').first()).toHaveValue('test');
  });

  it('works with `mount` renders', () => {
    const wrapper = mount(<Fixture />);
    expect(wrapper.find('input').first()).toHaveValue('test');
  });

  it('prioritizes `value', () => {
    const wrapper = shallow(<Fixture />);
    expect(wrapper.find('input').at(1)).toHaveValue('bar');
    expect(wrapper.find('input').at(1)).not.toHaveValue('foo');
  });

  it('works with with jasmines negation', () => {
    const wrapper = shallow(<Fixture />);
    expect(wrapper.find('input').first()).not.toHaveValue('foo');
  });
});
