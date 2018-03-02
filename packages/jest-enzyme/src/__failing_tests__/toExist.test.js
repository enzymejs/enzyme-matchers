const { shallow } = require('enzyme');
const React = require('react');

describe('failing test', () => {
  const Fixture = () => <div />;

  it('fails toExist', () => {
    expect(shallow(<Fixture />).find('foobar')).toExist();
  });

  it('fails NOT toExist', () => {
    expect(shallow(<Fixture />)).not.toExist();
  });

  it('fails NOT toExist multiple nodes', () => {
    const nodes = (
      <div>
        <span />
        <span foo />
      </div>
    );

    expect(shallow(nodes).find('span')).not.toExist();
  });
});
