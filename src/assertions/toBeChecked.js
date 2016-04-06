/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toBeChecked
 * @flow
 */

export default {
  toBeChecked(util:Object, customEqualityTesters:Object) : Object {
    return {
      compare(actual:Object, expected:Object) {
        console.log(actual, expected);
      }
    }
  }
}
