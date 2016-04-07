const { shallow, mount } = require('enzyme');
const React = require('react');

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
  it('works with `shallow` renders', () => {
    const wrapper = shallow(<Fixture />);
    expect(wrapper).toHaveState('foo');
  });

  it('works with `mount` renders', () => {
    const wrapper = mount(<Fixture />);
    expect(wrapper).toHaveState('foo');
  });

  it('can validate the value also', () => {
    const wrapper = shallow(<Fixture />);
    expect(wrapper).toHaveState('foo', false);
  });

  it('works with with jasmines negation', () => {
    const wrapper = shallow(<Fixture />);

    expect(wrapper).not.toHaveState('foo', true);
  });

  it('can validate arrays', () => {
    const wrapper = shallow(<Fixture />);

    expect(wrapper).toHaveState('array', [1, 2, 3]);
  });

  it('can validate objects', () => {
    const wrapper = shallow(<Fixture />);

    expect(wrapper).toHaveState('object', { foo: 'bar' });
  });
});
