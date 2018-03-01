import reduceAssertionObject from '../reduceAssertionObject';

const _this = { equals: (a, b) => a === b };

describe('reduceAssertionObject', () => {
  it('passes true if equal match', () => {
    const compDetails = { foo: true, bar: false };
    const matchDetails = { foo: true, bar: false };

    const results = reduceAssertionObject.call(
      _this,
      compDetails,
      matchDetails
    );

    expect(results.pass).toBeTruthy();
    expect(results.actual).toEqual(compDetails);
    expect(results.expected).toEqual(matchDetails);
    expect(results.missingKeys).toEqual([]);
    expect(results.unmatchedKeys).toEqual([]);
  });

  it('passes true if key,value equal match', () => {
    const compDetails = { foo: true, bar: false };

    const results = reduceAssertionObject.call(_this, compDetails, 'foo', true);

    expect(results.pass).toBeTruthy();
    expect(results.actual).toEqual({ foo: true });
    expect(results.expected).toEqual({ foo: true });
    expect(results.missingKeys).toEqual([]);
    expect(results.unmatchedKeys).toEqual([]);
  });

  it('passes false when one key mismatches', () => {
    const compDetails = { foo: true, bar: false };
    const matchDetails = { foo: true, bar: true };

    const results = reduceAssertionObject.call(
      _this,
      compDetails,
      matchDetails
    );

    expect(results.pass).toBeFalsy();
    expect(results.actual).toEqual(compDetails);
    expect(results.expected).toEqual(matchDetails);
    expect(results.missingKeys).toEqual([]);
    expect(results.unmatchedKeys).toEqual(['bar']);
  });

  it('passes false when one key mismatches', () => {
    const compDetails = { foo: true, bar: false };
    const matchDetails = { foo: true, bar: true };

    const results = reduceAssertionObject.call(
      _this,
      compDetails,
      matchDetails
    );

    expect(results.pass).toBeFalsy();
    expect(results.actual).toEqual(compDetails);
    expect(results.expected).toEqual(matchDetails);
    expect(results.missingKeys).toEqual([]);
    expect(results.unmatchedKeys).toEqual(['bar']);
  });

  it('passes false when an extra key is provided', () => {
    const compDetails = { foo: true };
    const matchDetails = { foo: true, bar: true };

    const results = reduceAssertionObject.call(
      _this,
      compDetails,
      matchDetails
    );

    expect(results.pass).toBeFalsy();
    expect(results.actual).toEqual(compDetails);
    expect(results.expected).toEqual(matchDetails);
    expect(results.missingKeys).toEqual(['bar']);
    expect(results.unmatchedKeys).toEqual([]);
  });
});
