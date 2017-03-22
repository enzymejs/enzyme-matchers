const { shallow, mount } = require('enzyme');
const React = require('react');

describe('failing test', () => {
  const Fixture = () => (
    <div><i /></div>
  );

  [shallow, mount].forEach(builder => {
    describe(builder.name, () => {
      it('fails toContainReact', () => {
        expect(
          builder(<Fixture />)
        ).toContainReact(<b />);
      });

      it('fails NOT toContainReact', () => {
        expect(
          builder(<Fixture />)
        ).not.toContainReact(<i />);
      });

      it('fails NOT toContainReact multiple nodes', () => {
        expect(
          builder(<div><span /><span foo /></div>).find('span')
        ).toContainReact(<span foo={false} />);
      });
    });
  });
});
