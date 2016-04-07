/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toHaveValue
 * @flow
 */

export default {
  toHaveValue() : Object {
    return {
      compare(enzymeWrapper:Object, expectedValue:any) : Object {
        let pass = false;

        const props = enzymeWrapper.props();

        // set to the default checked
        if (props.hasOwnProperty('defaultValue')) {
          pass = props.defaultValue === expectedValue;
        }

        // if it has the `value` property, CHECK that
        if (props.hasOwnProperty('value')) {
          pass = props.value === expectedValue;
        }

        return {
          pass,
          message: `Expected "${enzymeWrapper.html()}" to have value of "${expectedValue}"`,
        };
      },
    };
  },
};
