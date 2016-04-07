const { shallow, mount } = require('enzyme');
const React = require('react');

function Fixture() {
  return (
    <div>
      <span id="child" className="foo" />
    </div>
  );
}

describe('toContain', () => {
  it('works with `shallow` renders', () => {
    const wrapper = shallow(<Fixture />);

    expect(wrapper.find('#child')).toMatch('span');
    expect(wrapper.find('#child')).toMatch('#child');
    expect(wrapper.find('#child')).toMatch('.foo');
  });

  it('works with `mount` renders', () => {
    const wrapper = mount(<Fixture />);

    expect(wrapper.find('#child')).toMatch('span');
    expect(wrapper.find('#child')).toMatch('#child');
    expect(wrapper.find('#child')).toMatch('.foo');
  });

  it('works with with jasmines negation', () => {
    const wrapper = shallow(<Fixture />);
    expect(wrapper.find('#child')).not.toMatch('ball');
  });
});
