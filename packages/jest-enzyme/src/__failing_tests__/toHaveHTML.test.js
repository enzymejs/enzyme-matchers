const { shallow } = require('enzyme');
const React = require('react');

describe('failing test', () => {
  const Fixture = () => (
    <div>
      <i><b /></i>
    </div>
  );

  it('fails toHaveHTML', () => {
    expect(
      shallow(<Fixture />)
    ).toHaveHTML('<div><b /></div>');
  });

  it('fails NOT toHaveHTML', () => {
    expect(
      shallow(<Fixture />)
    ).not.toHaveHTML('<div><i><b></b></i></div>');
  });
});
