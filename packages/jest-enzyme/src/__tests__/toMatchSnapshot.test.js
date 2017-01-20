const React = require('react');
const { shallow, mount } = require('enzyme');

describe('toMatchSnapshot OVERIDE', () => {
  [shallow, mount].forEach(builder => {
    it(`works for enzyme objects (${builder.name})`, () => {
      class Fixture extends React.Component {
        onClick() {}
        render() {
          return (
            <div onClick={this.onClick}>
              <span>foobar</span>
            </div>
          );
        }
      }
      const wrapper = builder(<Fixture />);

      expect(wrapper).toMatchSnapshot();
    });
  });


  it('falls back to the default for non enzyme objects', () => {
    expect(1).toMatchSnapshot();
    expect({nodes: []}).toMatchSnapshot();
  });
});
