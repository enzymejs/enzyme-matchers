const { shallow, mount } = require('enzyme');
const React = require('react');

function Fixture() {
  return (
    <div>
      <p id="full">Test</p>
      <p id="empty"></p>
    </div>
  );
}

describe('toHaveText', () => {
  it('works with `shallow` renders', () => {
    const wrapper = shallow(<Fixture />);
    expect(wrapper.find('#full')).toHaveText('Test');
    expect(wrapper.find('#full')).toHaveText();
  });

  it('works with `mount` renders', () => {
    const wrapper = mount(<Fixture />);
    expect(wrapper.find('#full')).toHaveText('Test');
    expect(wrapper.find('#full')).toHaveText();
  });

  it('works with with jasmines negation', () => {
    const wrapper = shallow(<Fixture />);
    expect(wrapper.find('#full')).not.toHaveText('Wrong');
    expect(wrapper.find('#empty')).not.toHaveText();
  });
});
