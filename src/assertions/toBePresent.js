/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toBePresent
 * @flow
 */

export default {
  toBePresent() : Object {
    return {
      compare(enzymeWrapper:Object) : Object {
        return {
          pass: enzymeWrapper.length !== 0,
          message: 'Expected contents to not be empty, but it is',
        };
      },
    };
  },
};
