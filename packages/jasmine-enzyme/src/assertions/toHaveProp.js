/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toHaveProp
 * @flow
 */

import negateMessage from '../negateMessage';
import type { Matcher } from '../types/Matcher';
import type { MatcherMethods } from '../types/MatcherMethods';
import type { EnzymeObject } from '../types/EnzymeObject';

export default {
  toHaveProp(util:Object, customEqualityTesters:Array<Function>) : MatcherMethods {
    function toHaveProp(enzymeWrapper:EnzymeObject, propKey:string, propValue:?any) : Matcher {
      const props = enzymeWrapper.props();

      // error if the prop doesnt exist
      if (!props.hasOwnProperty(propKey)) {
        return {
          pass: false,
          message: `Expected wrapper to have prop "${propKey}"`,
        };
      }

      // key exists given above check, and we're not validating over values,
      // so its always true
      if (propValue === undefined) {
        return {
          pass: true,
          message: '',
        };
      }

      return {
        pass: util.equals(props[propKey], propValue, customEqualityTesters),
        message: `
          Expected wrappers prop values to match for key "${propKey}":
          Actual: ${JSON.stringify(props[propKey])}
          Expected: ${JSON.stringify(propValue)}
        `,
      };
    }

    return {
      compare(enzymeWrapper:EnzymeObject, propKey:string, propValue:?any) : Matcher {
        return toHaveProp(enzymeWrapper, propKey, propValue);
      },

      negativeCompare(enzymeWrapper:EnzymeObject, propKey:string, propValue:?any) : Matcher {
        const result:Matcher = toHaveProp(enzymeWrapper, propKey, propValue);

        result.message = negateMessage(result.message);
        result.pass = !result.pass;

        return result;
      },
    };
  },
};
