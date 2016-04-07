const { shallow, mount } = require('enzyme');
const React = require('react');
const { toHaveRef } = require.requireActual('../toHaveRef');

class Fixture extends React.Component {
  render() {
    return (
      <div>
        <span ref="child" />
      </div>
    );
  }
}

describe('toHaveRef', () => {
  it('fails with `shallow` renders', () => {
    const wrapper = shallow(<Fixture />);

    const { compare } = toHaveRef();
    const results = compare(wrapper, 'child');

    expect(results.pass).toBeFalsy();
  });

  it('works with `mount` renders', () => {
    const wrapper = mount(<Fixture />);
    expect(wrapper).toHaveRef('child');
  });

  it('works with with jasmines negation', () => {
    const wrapper = shallow(<Fixture />);
    expect(wrapper).not.toHaveRef('foo');
  });
});
