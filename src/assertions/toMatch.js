/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toMatch
 * @flow
 */

export default {
  toMatch() : Object {
    return {
      compare(enzymeWrapper:Object, selector:string) : Object {
        return {
          pass: enzymeWrapper.is(selector),
          message: `Expected to match "${selector}".`,
        };
      },
    };
  },
};
