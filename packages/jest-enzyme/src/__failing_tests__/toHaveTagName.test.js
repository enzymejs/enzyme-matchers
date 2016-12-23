const { shallow, mount } = require('enzyme');
const React = require('react');

describe('failing test', () => {
  const Fixture = () => <div></div>;

  it('fails toHaveTagName', () => {
    expect(
      mount(<Fixture />)
    ).toHaveTagName('span');
  });

  it('fails NOT toHaveTagName', () => {
    expect(
      shallow(<Fixture />)
    ).not.toHaveTagName('div');
  });
});
