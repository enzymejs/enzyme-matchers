/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toMatchSelector
 * @flow
 */

import negateMessage from '../negateMessage';
import type { Matcher } from '../types/Matcher';
import type { MatcherMethods } from '../types/MatcherMethods';
import type { EnzymeObject } from '../types/EnzymeObject';

export default {
  toMatchSelector() : MatcherMethods {
    function toMatchSelector(enzymeWrapper:EnzymeObject, selector:string) : Matcher {
      return {
        pass: enzymeWrapper.is(selector),
        message: `Expected to match "${selector}".`,
      };
    }

    return {
      compare(enzymeWrapper:EnzymeObject, selector:string) : Object {
        return toMatchSelector(enzymeWrapper, selector);
      },

      negativeCompare(enzymeWrapper:EnzymeObject, selector: string) : Matcher {
        const result:Matcher = toMatchSelector(enzymeWrapper, selector);

        result.message = negateMessage(result.message);
        result.pass = !result.pass;

        return result;
      },
    };
  },
};
