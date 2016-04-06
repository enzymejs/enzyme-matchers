const jasmineEnzyme = require.requireActual('../'); // start jasmineEnzyme()
jasmineEnzyme();

describe('toBeChecked', () => {
  it('is added', () => {
    expect(
      () => expect(1).toBeChecked()
    ).not.toThrow();
  });
});
