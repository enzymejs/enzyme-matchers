// this is a migration step.

describe('jest', () => {
  it('should throw an error', () => {
    const jasmineEnzyme = require('../');

    expect(jasmineEnzyme).toThrow();
  });
});
