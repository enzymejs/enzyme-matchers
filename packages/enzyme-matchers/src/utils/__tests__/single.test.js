const single = require('../single');

describe('single', () => {
  const matcherFn = jest.fn(() => 0x3);

  beforeEach(matcherFn.mockClear);

  it('Returns an error when called with 0 nodes', () => {
    const results = single(matcherFn)({
      getElements() {
        return [];
      },
    });

    expect(results.pass).toBeFalsy();
    expect(matcherFn).not.toBeCalled();
  });

  it('Returns an error when called with 2+ nodes', () => {
    const results = single(matcherFn)({
      getElements() {
        return [1, 2, 3];
      },
    });

    expect(results.pass).toBeFalsy();
    expect(matcherFn).not.toBeCalled();
  });

  it('calls the matcherFn and returns the results when only 1 node', () => {
    const results = single(matcherFn)({
      getElements() {
        return [1];
      },
    });

    expect(results).toBe(0x3);
    expect(matcherFn).toBeCalled();
  });

  it('gives a useful message', () => {
    const results = single(matcherFn)({
      getElements() {
        return [1, 2, 3];
      },
    });

    // This helps the snapshot be compatible accross different environments
    results.message = results.message.replace('mockConstructor', '');
    results.negatedMessage = results.negatedMessage.replace(
      'mockConstructor',
      ''
    );

    expect(results).toMatchSnapshot();
  });
});
