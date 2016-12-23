const { shallow } = require('enzyme');
const React = require('react');

describe('failing test', () => {
  const Fixture = () => (
    <div><i /></div>
  );

  it('fails toContainReact', () => {
    expect(
      shallow(<Fixture />)
    ).toContainReact(<b />);
  });

  it('fails NOT toContainReact', () => {
    expect(
      shallow(<Fixture />)
    ).not.toContainReact(<i />);
  });

  it('fails NOT toContainReact multiple nodes', () => {
    expect(
      shallow(<div><span /><span foo /></div>).find('span')
    ).toContainReact(<span foo={false} />);
  });
});
