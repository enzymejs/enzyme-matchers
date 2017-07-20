const React = require('react');
const { shallow } = require('enzyme');

const complexValue = {
  simple1: 'value1',
  simple2: 'value2',
  nested: { prop1: 'value1' },
};
class Fixture extends React.Component {
  constructor() {
    super();
    this.state = { state1: complexValue };
  }

  render() {
    return <div />;
  }
}

describe('Jest-enzyme supports asymmetric matcher', () => {
  it('in toHaveProp', () => {
    const wrapper = shallow(<div prop1={complexValue}>Hi</div>);

    expect(wrapper).toHaveProp('prop1', complexValue);
    expect(wrapper).toHaveProp(
      'prop1',
      expect.objectContaining({ simple1: 'value1' }),
    );
  });

  it('in toHaveState', () => {
    const wrapper = shallow(<Fixture />);

    expect(wrapper).toHaveState('state1', complexValue);
    expect(wrapper).toHaveState(
      'state1',
      expect.objectContaining({ simple1: 'value1' }),
    );
  });

  it('in toHaveStyle', () => {
    const wrapper = shallow(<div style={{ height: '100%' }}>Hi</div>);

    expect(wrapper).toHaveStyle('height', '100%');
    expect(wrapper).toHaveStyle('height', expect.stringContaining('%'));
  });
});
