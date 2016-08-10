/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toBeEmpty
 * @flow
 */

import negateMessage from '../negateMessage';
import type { Matcher } from '../types/Matcher';
import type { MatcherMethods } from '../types/MatcherMethods';
import type { EnzymeObject } from '../types/EnzymeObject';

export default {
  toBeEmpty() : MatcherMethods {
    function toBeEmpty(enzymeWrapper:EnzymeObject) : Matcher {
      return {
        pass: enzymeWrapper.length === 0,
        message: `Expected selector to return an empty set, but found ${enzymeWrapper.length} nodes.`, // eslint-disable-line max-len
      };
    }

    return {
      compare(enzymeWrapper:EnzymeObject) : Matcher {
        return toBeEmpty(enzymeWrapper);
      },

      negativeCompare(enzymeWrapper:EnzymeObject) : Matcher {
        const result:Matcher = toBeEmpty(enzymeWrapper);

        result.message = negateMessage(result.message);
        result.pass = !result.pass;

        return result;
      },
    };
  },
};
