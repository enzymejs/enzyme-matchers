const { shallow } = require('enzyme');
const React = require('react');

describe('failing test', () => {
  const Fixture = () => (
    <div>
      <span style={{ background: 'black' }} />
    </div>
  );

  it('fails toHaveStyle', () => {
    expect(
      shallow(<Fixture />).find('span')
    ).toHaveStyle('fontSize');

    expect(
      shallow(<Fixture />).find('span')
    ).toHaveStyle('fontSize', 5);
  });

  it('fails NOT toHaveStyle', () => {
    expect(
      shallow(<Fixture />).find('span')
    ).not.toHaveStyle('background', 'blue');
  });
});
