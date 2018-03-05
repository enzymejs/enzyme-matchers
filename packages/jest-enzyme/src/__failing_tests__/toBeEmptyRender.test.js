describe('failing test', () => {
  [shallow, mount].forEach(builder => {
    describe(builder.name, () => {
      const EmptyRenderFixture = () => null;

      const NonEmptyRenderFixture = () =>
        <div>
          <EmptyRenderFixture />
        </div>;

      it('fails toBeEmptyRender', () => {
        expect(builder(<NonEmptyRenderFixture />)).toBeEmptyRender();
      });

      it('fails NOT toBeEmptyRender', () => {
        expect(
          builder(<EmptyRenderFixture />).find('EmptyRenderFixture')
        ).not.toBeEmptyRender();
      });
    });
  });
});
