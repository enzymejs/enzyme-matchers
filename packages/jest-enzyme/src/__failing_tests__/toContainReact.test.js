const { shallow, mount } = require('enzyme');
const React = require('react');

describe('failing test', () => {
  const Fixture = () =>
    <div>
      <i />
    </div>;

  [shallow, mount].forEach(builder => {
    describe(builder.name, () => {
      it('fails toContainReact', () => {
        expect(builder(<Fixture />)).toContainReact(<b />);
      });

      it('fails NOT toContainReact', () => {
        expect(builder(<Fixture />)).not.toContainReact(<i />);
      });

      it('fails NOT toContainReact multiple nodes', () => {
        const nodes = (
          <div>
            <span />
            <span foo />
          </div>
        );

        expect(builder(nodes).find('span')).toContainReact(
          <span foo={false} />
        );
      });
    });
  });
});
