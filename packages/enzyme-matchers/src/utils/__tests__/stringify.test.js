const stringify = require('../stringify');

describe('stringify', () => {
  it('works with circular structs', () => {
    const proof = {};
    proof.falsy = false;
    proof.truthy = true;
    proof.string = 'string';
    proof.null = null;
    proof.circular = proof;
    proof.class = Promise;
    proof.arry = Object.keys(proof).map(k => proof[k]); // includes all other proofs

    expect(stringify(proof)).toMatchSnapshot();
  });

  it('does not mutate an array inside an object', () => {
    const anObject = { array: [1, 2, 3] };
    stringify(anObject);
    expect(anObject.array).toEqual([1, 2, 3]);
  });
});
