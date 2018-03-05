describe('failing test', () => {
  class Fixture extends React.Component {
    constructor() {
      super();
      this.state = {
        foo: true,
      };
    }
    render() {
      return (
        <div disabled>
          <i>
            {this.state.foo}
            <b />
          </i>
        </div>
      );
    }
  }

  it('fails toHaveState', () => {
    expect(shallow(<Fixture />)).toHaveState('baz');

    expect(shallow(<Fixture />)).toHaveState('baz', true);
  });

  it('fails NOT toHaveState', () => {
    expect(shallow(<Fixture disabled />)).not.toHaveState('foo');

    expect(shallow(<Fixture disabled />)).not.toHaveState('foo', true);
  });

  it('fails toHaveState undefined value', () => {
    expect(shallow(<Fixture />)).toHaveState('foo', undefined);
  });
});
