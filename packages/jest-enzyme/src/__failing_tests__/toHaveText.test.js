const { shallow } = require('enzyme');
const React = require('react');

describe('failing Text', () => {
  const Fixture = () => <div><span>foo</span></div>;

  it('fails toHaveText', () => {
    expect(
      shallow(<Fixture />).find('span')
    ).toHaveText('bar');
  });

  it('fails NOT toHaveText', () => {
    expect(
      shallow(<Fixture />).find('span')
    ).toHaveText('foo');
  });
});
