/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toBeDisabled
 * @flow
 */

import negateMessage from '../negateMessage';
import type { Matcher } from '../types/Matcher';
import type { MatcherMethods } from '../types/MatcherMethods';
import type { EnzymeObject } from '../types/EnzymeObject';

export default {
  toBeDisabled() : MatcherMethods {
    function toBeDisabled(enzymeWrapper:EnzymeObject) : Matcher {
      return {
        pass: !!enzymeWrapper.prop('disabled'),
        message: 'Expected node to be "disabled."',
      };
    }


    return {
      compare(enzymeWrapper:EnzymeObject) : Matcher {
        return toBeDisabled(enzymeWrapper);
      },

      negativeCompare(enzymeWrapper:EnzymeObject) : Matcher {
        const result:Matcher = toBeDisabled(enzymeWrapper);

        result.message = negateMessage(result.message);
        result.pass = !result.pass;

        return result;
      },
    };
  },
};
