const { shallow, mount } = require('enzyme');
const React = require('react');

describe('failing Value', () => {
  const Fixture = () => (
    <div>
      <input value onChange={function(){}}/>
      <input defaultValue />
    </div>
  );

  it('fails toHaveValue', () => {
    expect(
      shallow(<Fixture />).find('input[value]')
    ).toHaveValue(false);
  });

  it('fails NOT toHaveValue', () => {
    expect(
      shallow(<Fixture />).find('input[defaultValue]')
    ).not.toHaveValue(true);
  });
});
