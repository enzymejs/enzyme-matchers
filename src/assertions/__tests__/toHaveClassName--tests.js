const { shallow, mount } = require('enzyme');
const React = require('react');

function Fixture() {
  return (
    <div>
      <span className="foo" />
      <span className="bar baz" />
    </div>
  );
}

describe('toHaveClassName', () => {
  it('works with `shallow` renders', () => {
    const wrapper = shallow(<Fixture />);
    expect(wrapper.find('.foo')).toHaveClassName('foo');
  });

  it('works with `mount` renders', () => {
    const wrapper = mount(<Fixture />);
    expect(wrapper.find('.bar')).toHaveClassName('bar baz');
    expect(wrapper.find('.bar')).toHaveClassName('bar');
    expect(wrapper.find('.bar')).toHaveClassName('baz');
  });

  it('works with with jasmines negation', () => {
    const wrapper = shallow(<Fixture />);
    expect(wrapper.find('.bar')).not.toHaveClassName('balsdfja');
  });
});
