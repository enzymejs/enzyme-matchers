const { shallow, mount } = require('enzyme');
const React = require('react');


describe('jest-matchers', () => {
  it('toBeChecked', () => {
    const Fixture = (props) => <input defaultChecked={props.defaultChecked} />;

    expect(
      shallow(<Fixture />).find('input')
    ).not.toBeChecked();

    expect(
      shallow(<Fixture defaultChecked />).find('input')
    ).toBeChecked();
  });

  it('toBeDisabled', () => {
    const Fixture = (props) => <input disabled={props.disabled} />;

    expect(
      shallow(<Fixture />).find('input')
    ).not.toBeDisabled();

    const node = shallow(<Fixture disabled />).find('input');

    console.log(node.name())

    expect(
      shallow(<Fixture disabled />).find('input')
    ).not.toBeDisabled();
  });

  it('toHaveHTML', () => {
    const Fixture = () => (
      <div>
        <i><b /></i>
      </div>
    );

    const wrapper = shallow(<Fixture />);

    expect(wrapper).toHaveHTML('<i></i>')
  });
})
