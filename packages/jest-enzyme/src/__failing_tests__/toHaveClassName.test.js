const { shallow } = require('enzyme');
const React = require('react');

describe('failing test', () => {
  const Fixture = () => (
    <div>
      <span className="foo" />
      <span className="foo bar" />
      <span className="foo bar baz" />
    </div>
  );

  it('fails toHaveClassName', () => {
    expect(
      shallow(<Fixture />).find('.bar')
    ).not.toHaveClassName('foo');
  });

  it('fails NOT toHaveClassName', () => {
    expect(
      shallow(<Fixture />).find('.foo')
    ).toHaveClassName('baz');
  });
});
