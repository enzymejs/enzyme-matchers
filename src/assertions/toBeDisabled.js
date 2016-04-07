/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toBeDisabled
 * @flow
 */

export default {
  toBeDisabled() : Object {
    return {
      compare(enzymeWrapper:Object) : Object {
        return {
          pass: !!enzymeWrapper.prop('disabled'),
          message: `Expected node to be "disabled"`,
        };
      },
    };
  },
};
