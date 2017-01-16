const { mount } = require('enzyme');
const React = require('react');

describe('failing test', () => {
  class Fixture extends React.Component {
    render() {
      return (
        <div ref="foo">
          <i><b /></i>
        </div>
      );
    }
  }

  it('fails toHaveRef', () => {
    expect(
      mount(<Fixture />)
    ).toHaveRef('baz');
  });

  it('fails NOT toHaveRef', () => {
    expect(
      mount(<Fixture />)
    ).not.toHaveRef('foo');
  });
});
