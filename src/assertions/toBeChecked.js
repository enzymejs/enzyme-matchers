/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toBeChecked
 * @flow
 */

import negateMessage from '../negateMessage';

export default {
  toBeChecked() : Object {

    function toBeChecked(enzymeWrapper:Object) : Object  {
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

      console.log(enzymeWrapper.html());

      return {
        pass,
        message: `Expected "${enzymeWrapper.html()}" to be checked`,
      };
    }


    return {
      compare(enzymeWrapper:Object) : Object {
        return toBeChecked(enzymeWrapper);
      },

      negativeCompare(enzymeWrapper:Object) : Object {
        const result = toBeChecked(enzymeWrapper);

        result.message = negateMessage(result.message);
        result.pass = !result.pass;

        return result;
      }
    };
  },
};
