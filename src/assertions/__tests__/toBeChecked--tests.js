const { shallow, mount } = require('enzyme');
const React = require('react');

function Fixture() {
  return (
    <div>
      <input id="checked" defaultChecked />
      <input id="not" defaultChecked={false} />
      <input id="tertiary" defaultChecked checked={false} />
    </div>
  );
}

describe('toBeChecked', () => {
  it('works with `shallow` renders', () => {
    const wrapper = shallow(<Fixture />);
    expect(wrapper.find('#checked')).toBeChecked();
  });

  it('works with `mount` renders', () => {
    const wrapper = mount(<Fixture />);
    expect(wrapper.find('#checked')).toBeChecked();
  });

  it('works with with jasmines negation', () => {
    const wrapper = shallow(<Fixture />);
    expect(wrapper.find('#not')).not.toBeChecked();
  });

  it('can be defaultChecked, currently not checked, and know to say its not checked', () => {
    const wrapper = shallow(<Fixture />);
    expect(wrapper.find('#tertiary')).not.toBeChecked();
  });
});
