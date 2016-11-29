const stringify = require('../stringify');

describe('stringify', () => {
  it('works with circular structs', () => {
    const proof = {};
    proof.falsy = false;
    proof.truthy = true;
    proof.string = 'string';
    proof.circular = proof;
    proof.instance = new Promise(resolve => {});
    proof.class = Promise;
    proof.arry = Object.keys(proof).map(k => proof[k]); // includes all other proofs

    expect(
      stringify(proof)
    ).toMatchSnapshot();
  });
});
