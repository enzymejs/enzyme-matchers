/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toHaveState
 * @flow
 */

import negateMessage from '../negateMessage';
import type { Matcher } from '../types/Matcher';
import type { MatcherMethods } from '../types/MatcherMethods';
import type { EnzymeObject } from '../types/EnzymeObject';

export default {
  toHaveState(util:Object, customEqualityTesters:Object) : MatcherMethods {
    function toHaveState(enzymeWrapper:EnzymeObject, stateKey:string, stateValue:?any) : Matcher {
      const state = enzymeWrapper.state();

      // error if the state key doesnt exist
      if (!state.hasOwnProperty(stateKey)) {
        return {
          pass: false,
          message: `Expected component state to have key of "${stateKey}"`,
        };
      }

      // key exists given above check, and we're not validating over values,
      // so its always true
      if (stateValue === undefined) {
        return {
          pass: true,
          message: `Expected component state to have key of "${stateKey}"`,
        };
      }

      return {
        pass: util.equals(state[stateKey], stateValue, customEqualityTesters),
        message: `
          Expected component state values to match for key "${stateKey}":
          Actual: ${JSON.stringify(state)}
          Expected: ${JSON.stringify(stateValue)}
        `,
      };
    }

    return {
      compare(enzymeWrapper:EnzymeObject, stateKey:string, stateValue:?any) : Matcher {
        return toHaveState(enzymeWrapper, stateKey, stateValue);
      },

      negativeCompare(enzymeWrapper:EnzymeObject, stateKey:string, stateValue:?any) : Matcher {
        const result:Matcher = toHaveState(enzymeWrapper, stateKey, stateValue);

        result.message = negateMessage(result.message);
        result.pass = !result.pass;

        return result;
      },
    };
  },
};
