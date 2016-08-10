/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toHaveValue
 * @flow
 */

import negateMessage from '../negateMessage';
import type { Matcher } from '../types/Matcher';
import type { MatcherMethods } from '../types/MatcherMethods';
import type { EnzymeObject } from '../types/EnzymeObject';

export default {
  toHaveValue() : MatcherMethods {
    function toHaveValue(enzymeWrapper:EnzymeObject, expectedValue:any) : Matcher {
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
    }

    return {
      compare(enzymeWrapper:EnzymeObject, expectedValue:any) : Matcher {
        return toHaveValue(enzymeWrapper, expectedValue);
      },

      negativeCompare(enzymeWrapper:EnzymeObject, expectedValue:any) : Matcher {
        const result:Matcher = toHaveValue(enzymeWrapper, expectedValue);

        result.message = negateMessage(result.message);
        result.pass = !result.pass;

        return result;
      },
    };
  },
};
