/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toHaveText
 * @flow
 */

export default {
  toHaveText() : Object {
    return {
      compare(enzymeWrapper:Object, text:string) : Object {
        const actualText = enzymeWrapper.text();

        return {
          pass: actualText === text,
          message: `Expected "${actualText}" to equal ${text}`,
        };
      },
    };
  },
};
