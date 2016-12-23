const { shallow } = require('enzyme');
const React = require('react');

describe('failing test', () => {
  const Fixture = () => (
    <div disabled>
      <i><b /></i>
    </div>
  );

  it('fails toHaveProp', () => {
    expect(
      shallow(<Fixture />)
    ).toHaveProp('enabled');
  });

  it('fails NOT toHaveProp', () => {
    expect(
      shallow(<Fixture disabled />)
    ).not.toHaveProp('disabled', true);
  });
});
