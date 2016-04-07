/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toBeChecked
 * @flow
 */

export default {
  toBeChecked() : Object {
    return {
      compare(enzymeWrapper:Object) : Object {
        let pass = false;

        const props = enzymeWrapper.props();

        // set to the default checked
        if (props.hasOwnProperty('defaultChecked')) {
          pass = props.defaultChecked;
        }

        // if it has the checked property, CHECK that.
        if (props.hasOwnProperty('checked')) {
          pass = props.checked;
        }

        return {
          pass,
          message: `Expected "${enzymeWrapper.html()}" to be checked`,
        };
      },
    };
  },
};
