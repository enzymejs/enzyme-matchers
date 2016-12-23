const { shallow } = require('enzyme');
const React = require('react');

describe('failing test', () => {
  class Fixture extends React.Component {
    state = {
      foo: true,
    }
    render() {
      return (
        <div disabled>
          <i><b /></i>
        </div>
      );
    }
  }

  it('fails toHaveState', () => {
    expect(
      shallow(<Fixture />)
    ).toHaveState('baz');

    expect(
      shallow(<Fixture />)
    ).toHaveState('baz', true);
  });

  it('fails NOT toHaveState', () => {
    expect(
      shallow(<Fixture disabled />)
    ).not.toHaveState('foo');

    expect(
      shallow(<Fixture disabled />)
    ).not.toHaveState('foo', true);
  });
});
