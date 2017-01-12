const single = require('../single');

describe('single', () => {
  const matcherFn = jest.fn(function foo(){ return 0x3});

  beforeEach(matcherFn.mockClear);

  it('Returns an error when called with 0 nodes', () => {
    const results = single(matcherFn)({nodes: []});

    expect(results.pass).toBeFalsy();
    expect(matcherFn).not.toBeCalled();
  });

  it('Returns an error when called with 2+ nodes', () => {
    const results = single(matcherFn)({nodes: [1, 2, 3]});

    expect(results.pass).toBeFalsy();
    expect(matcherFn).not.toBeCalled();
  });

  it('calls the matcherFn and returns the results when only 1 node', () => {
    const results = single(matcherFn)({nodes: [1]});

    expect(results).toBe(0x3);
    expect(matcherFn).toBeCalled();
  });

  it('gives a useful message', () => {
    const results = single(matcherFn)({nodes: [1, 2, 3]});

    expect(results).toMatchSnapshot();
  });
});
