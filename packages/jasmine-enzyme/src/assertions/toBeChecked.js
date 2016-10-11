/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toBeChecked
 * @flow
 */

//import negateMessage from '../negateMessage';
import { toBeChecked } from 'enzyme-matchers';
import type { Matcher } from '../types/Matcher';
import type { MatcherMethods } from '../types/MatcherMethods';
import type { EnzymeObject } from '../types/EnzymeObject';

export default {
  toBeChecked() : MatcherMethods {
    return {
      compare(enzymeWrapper:EnzymeObject) : Matcher {
        return toBeChecked(enzymeWrapper);
      },

      //negativeCompare(enzymeWrapper:EnzymeObject) : Matcher {
        //const result:Matcher = toBeChecked(enzymeWrapper);

        //result.message = negateMessage(result.message);
        //result.pass = !result.pass;

        //return result;
      //},
    };
  },
};
