const { shallow, mount } = require('enzyme');
const React = require('react');

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
  it('works with `shallow` renders', () => {
    const wrapper = shallow(<Fixture />);
    expect(wrapper.find('#style1')).toHaveStyle('height', '100%');
    expect(wrapper.find('#style2')).toHaveStyle('flex', 8);
  });

  it('works with `mount` renders', () => {
    const wrapper = mount(<Fixture />);
    expect(wrapper.find('#style1')).toHaveStyle('height', '100%');
    expect(wrapper.find('#style2')).toHaveStyle('flex', 8);
  });
});
