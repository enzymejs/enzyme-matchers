const { shallow, mount } = require('enzyme');
const React = require('react');

describe('failing test', () => {
  [shallow, mount].forEach(builder => {
    describe(builder.name, () => {
      const Fixture = () => (
        <div></div>
      );

      it('fails toBeEmpty', () => {
        expect(
          builder(<Fixture />)
        ).toBeEmpty();
      });

      it('fails NOT toBeEmpty', () => {
        expect(
          builder(<Fixture />).find('foobar')
        ).not.toBeEmpty();
      });
    });
  });
});
