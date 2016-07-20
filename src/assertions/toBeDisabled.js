/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toBeDisabled
 * @flow
 */

import negateMessage from '../negateMessage';

export default {
  toBeDisabled() : Object {
    function toBeDisabled(enzymeWrapper:Object) : Object {
      return {
        pass: !!enzymeWrapper.prop('disabled'),
        message: 'Expected node to be "disabled"',
      };
    }


    return {
      compare(enzymeWrapper:Object) : Object {
        return toBeDisabled(enzymeWrapper);
      },

      negativeCompare(enzymeWrapper:Object) : Object {
        const result = toBeDisabled(enzymeWrapper);

        result.message = negateMessage(result.message);
        result.pass = !result.pass;

        return result;
      }
    };
  },
};
