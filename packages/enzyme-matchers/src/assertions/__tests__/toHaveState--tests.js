const { shallow, mount } = require('enzyme');
const React = require('react');

const toHaveState = require('../toHaveState');

class Fixture extends React.Component {
  constructor() {
    super();
    this.state = {
      foo: false,
      array: [1, 2, 3],
      object: { foo: 'bar' },
    };
  }

  render() {
    return (
      <div />
    );
  }
}

describe('toHaveState', () => {
  it('can validate falsy values', () => {
    const wrapper = shallow(<Fixture />);
    const { pass } = toHaveState(wrapper, 'foo', false);
    const { pass: fail } = toHaveState(wrapper, 'foo', true);

    expect(pass).toBeTruthy();
    expect(fail).toBeFalsy();
  });

  it('can validate arrays', () => {
    const wrapper = shallow(<Fixture />);
    const { pass } = toHaveState(wrapper, 'array', [1, 2, 3]);
    const { pass: fail } = toHaveState(wrapper, 'array', [4, 5, 6]);

    expect(pass).toBeTruthy();
    expect(fail).toBeFalsy();
  });

  it('can validate objects', () => {
    const wrapper = shallow(<Fixture />);
    const { pass } = toHaveState(wrapper, 'object', { foo: 'bar' });
    const { pass: fail } = toHaveState(wrapper, 'object', { foo: 'NOPE' });

    expect(pass).toBeTruthy();
    expect(fail).toBeFalsy();
  });

  it('returns the pass flag properly', () => {
    const wrapper = mount(<Fixture />);
    const truthyResults = toHaveState(wrapper, 'foo', false);
    const falsyResults = toHaveState(wrapper, 'foo', true);

    expect(truthyResults.pass).toBeTruthy();
    expect(falsyResults.pass).toBeFalsy();
  });

  it('returns the message with the proper pass/fail verbage', () => {
    const wrapper = mount(<Fixture />);
    const truthyResults = toHaveState(wrapper, 'foo', false);
    const falsyResults = toHaveState(wrapper, 'foo', true);

    expect(truthyResults.message).not.toContain('not');
    expect(falsyResults.message).toContain('not');
  });
});
