const { shallow, mount } = require('enzyme');
const React = require('react');

describe('failing Value', () => {
  const Fixture = () => (
    <div>
      <input value onChange={function(){}}/>
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
