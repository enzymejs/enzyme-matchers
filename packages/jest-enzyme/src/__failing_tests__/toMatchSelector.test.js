const { shallow } = require('enzyme');
const React = require('react');

describe('failing Value', () => {
  const Fixture = () => (
    <div>
      <input value onChange={() => {}} />
      <input defaultValue />
    </div>
  );

  it('fails toMatchSelector', () => {
    expect(
      shallow(<Fixture />).find('input[value]')
    ).toMatchSelector('span');
  });

  it('fails NOT toMatchSelector', () => {
    expect(
      shallow(<Fixture />).find('input[defaultValue]')
    ).not.toMatchSelector('input');
  });
});
