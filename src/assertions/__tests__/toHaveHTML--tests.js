const { shallow, mount } = require('enzyme');
const React = require('react');

function Fixture() {
  return (
    <div id="root">
      <span id="child">Test</span>
    </div>
  );
}

describe('toHaveHTML', () => {
  it('works with `shallow` renders', () => {
    const wrapper = shallow(<Fixture />);
    expect(wrapper.find('#child')).toHaveHTML(
      '<span id="child">Test</span>'
    );
  });

  it('works with `mount` renders', () => {
    const wrapper = mount(<Fixture />);
    expect(wrapper.find('#child')).toHaveHTML(
      '<span id="child">Test</span>'
    );
  });

  it('normalizes the quotations used', () => {
    const wrapper = shallow(<Fixture />);
    expect(wrapper.find('#child')).toHaveHTML(
      '<span id="child">Test</span>'
    );

    expect(wrapper.find('#child')).toHaveHTML(
      '<span id=\'child\'>Test</span>'
    );
  });

  it('works with with jasmines negation', () => {
    const wrapper = shallow(<Fixture />);
    expect(wrapper.find('#child')).not.toHaveHTML('foo');
  });
});
