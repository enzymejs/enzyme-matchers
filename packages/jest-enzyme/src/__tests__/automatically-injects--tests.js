import enzymeMatchers from 'enzyme-matchers';

const matchers = Object.keys(enzymeMatchers);

describe('jest-enzyme', () => {
  it('automatically adds the methods', () => {
    matchers.forEach(matcher => {
      const matcherFn = expect('foo')[matcher];
      expect(matcherFn).toBeDefined();
    });
  });
});
