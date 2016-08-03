/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toBePresent
 * @flow
 */

import negateMessage from '../negateMessage';
import type { Matcher } from '../types/Matcher';
import type { MatcherMethods } from '../types/MatcherMethods';
import type { EnzymeObject } from '../types/EnzymeObject';


export default {
  toBePresent() : MatcherMethods {
    function toBePresent(enzymeWrapper:EnzymeObject) : Matcher {
      return {
        pass: enzymeWrapper.length !== 0,
        message: 'Expected selector results to contain at least one node.',
      };
    }
    return {
      compare(enzymeWrapper:EnzymeObject) : Matcher {
        return toBePresent(enzymeWrapper);
      },

      negativeCompare(enzymeWrapper:EnzymeObject) : Matcher {
        const result:Matcher = toBePresent(enzymeWrapper);

        result.message = negateMessage(result.message);
        result.pass = !result.pass;

        return result;
      },
    };
  },
};
