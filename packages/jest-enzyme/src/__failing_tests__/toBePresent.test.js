const { shallow } = require('enzyme');
const React = require('react');

describe('failing test', () => {
  const Fixture = () => (
    <div></div>
  );

  it('fails toBePresent', () => {
    expect(
      shallow(<Fixture />).find('foobar')
    ).toBePresent();
  });

  it('fails NOT toBePresent', () => {
    expect(
      shallow(<Fixture />)
    ).not.toBePresent();
  });

  it('fails NOT toBePresent multiple nodes', () => {
    expect(
      shallow(<div><span /><span foo /></div>).find('span')
    ).not.toBePresent();
  });
});
