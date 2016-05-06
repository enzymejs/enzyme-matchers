const { shallow, mount } = require('enzyme');
const React = require('react');

function Fixture() {
  return (
    <div>
      <span id="child" className="foo" />
    </div>
  );
}

describe('toMatchSelector', () => {
  it('works with `shallow` renders', () => {
    const wrapper = shallow(<Fixture />);

    expect(wrapper.find('#child')).toMatchSelector('span');
    expect(wrapper.find('#child')).toMatchSelector('#child');
    expect(wrapper.find('#child')).toMatchSelector('.foo');
  });

  it('works with `mount` renders', () => {
    const wrapper = mount(<Fixture />);

    expect(wrapper.find('#child')).toMatchSelector('span');
    expect(wrapper.find('#child')).toMatchSelector('#child');
    expect(wrapper.find('#child')).toMatchSelector('.foo');
  });

  it('works with with jasmines negation', () => {
    const wrapper = shallow(<Fixture />);
    expect(wrapper.find('#child')).not.toMatchSelector('ball');
  });
});
