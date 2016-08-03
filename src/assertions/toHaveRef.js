/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toHaveRef
 * @flow
 */

import negateMessage from '../negateMessage';
import type { Matcher } from '../types/Matcher';
import type { MatcherMethods } from '../types/MatcherMethods';
import type { EnzymeObject } from '../types/EnzymeObject';

export default {
  toHaveRef() : MatcherMethods {
    function toHaveRef(enzymeWrapper:EnzymeObject, refName:string) : Matcher {
      const { node } = enzymeWrapper.ref(refName);

      return {
        pass: !!node,
        message: `Expected to find a ref "${refName}"`,
      };
    }

    return {
      compare(enzymeWrapper:EnzymeObject, refName:string) : Matcher {
        // can only be used with mount, so the `ref` API should be available.
        if (typeof enzymeWrapper.ref !== 'function') {
          return {
            pass: false,
            message: '`toHaveRef` can only be used with enzymes `mount` method.',
          };
        }

        return toHaveRef(enzymeWrapper, refName);
      },

      negativeCompare(enzymeWrapper:EnzymeObject, refName:string) : Matcher {
        // can only be used with mount, so the `ref` API should be available.
        if (typeof enzymeWrapper.ref !== 'function') {
          return {
            pass: false,
            message: '`toHaveRef` can only be used with enzymes `mount` method.',
          };
        }

        const result:Matcher = toHaveRef(enzymeWrapper, refName);

        result.message = negateMessage(result.message);
        result.pass = !result.pass;

        return result;
      },
    };
  },
};
