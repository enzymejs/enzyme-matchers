import React from 'react';
import protectAssertion from '../protectAssertion';
import { mount, shallow } from 'enzyme';

describe('protectAssertion', () => {
  const typesToCheck = [
    [],
    {},
    1,
    'string',
    new Promise(jest.fn),
    class Foo {},
    mount,
    shallow,
    true,
    { find: jest.fn() },
  ];

  typesToCheck.forEach(type => {
    it(`throws an error if the first argument is like ${type}`, () => {
      const assertion = jest.fn();
      const protectedAssertion = protectAssertion(assertion);

      expect(() => protectedAssertion(type)).toThrow();
    });
  });

  [mount, shallow].forEach(builder => {
    it(`(${builder.name}) calls the underlying matcher if given an enzyme object`, () => {
      const assertion = jest.fn();
      const protectedAssertion = protectAssertion(assertion);
      const wrapper = builder(<div />);

      protectedAssertion(wrapper);
      expect(assertion).toBeCalledWith(wrapper);
    });
  });

  it('prints a helpful error message', () => {
    function testAssertion() {}
    const protectedAssertion = protectAssertion(testAssertion);

    expect(() => protectedAssertion()).toThrow(
      `The test assertion testAssertion is part of the enzyme-matcher suite.
It appears you tried calling this matcher with a non-enzyme object.
This assertion must be called against a shallow, mount, or render-ed react component.
`
    );
  });
});
