const { shallow, mount } = require('enzyme');
const React = require('react');
const { toHaveTagName } = require('../toHaveTagName');

function Fixture() {
  return (
    <div>
      <span id="span" />
      <span />
      <a id="a" />
    </div>
  );
}

describe('toHaveTagName', () => {
  it('works with `shallow` renders', () => {
    const wrapper = shallow(<Fixture />);
    expect(wrapper.find('#span')).toHaveTagName('span');
  });

  it('works with `mount` renders', () => {
    const wrapper = mount(<Fixture />);
    expect(wrapper.find('#span')).toHaveTagName('span');
  });

  it('works with with jasmines negation', () => {
    const wrapper = shallow(<Fixture />);
    expect(wrapper.find('#a')).not.toHaveTagName('span');
  });

  it('gives a specific error when trying to find for multiple nodes', () => {
    const wrapper = shallow(<Fixture />);
    const { compare } = toHaveTagName();

    const result = compare(wrapper.find('span'), 'span');

    expect(result.pass).toBeFalsy();
    expect(result.message).toBe(
      'Cannot verify tag name on a wrapper of multiple nodes. Found 2 nodes.'
    );
  });
});
