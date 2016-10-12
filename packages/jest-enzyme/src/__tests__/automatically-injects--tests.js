describe('jest-enzyme', () => {
  it('automatically adds the methods', () => {
    const toContainReact = expect('foo').toContainReact;

    expect(toContainReact).toBeDefined();
  });
});
