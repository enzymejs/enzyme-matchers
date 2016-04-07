/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toHaveRef
 * @flow
 */

export default {
  toHaveRef() : Object {
    return {
      compare(enzymeWrapper:Object, refName:string) : Object {
        // can only be used with mount, so the `ref` API should be available.
        if (typeof enzymeWrapper.ref !== 'function') {
          return {
            pass: false,
            message: '`toHaveRef` can only be used with enzymes `mount` method.',
          };
        }

        const { node } = enzymeWrapper.ref(refName);

        return {
          pass: !!node,
          message: `Expected to find a ref "${refName}"`,
        };
      },
    };
  },
};
