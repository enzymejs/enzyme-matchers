/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toHaveTagName
 * @flow
 */

import negateMessage from '../negateMessage';
import type { Matcher } from '../types/Matcher';
import type { MatcherMethods } from '../types/MatcherMethods';
import type { EnzymeObject } from '../types/EnzymeObject';

export default {
  toHaveTagName() : MatcherMethods {
    function toHaveTagName(enzymeWrapper:EnzymeObject, tag:string) : Matcher {
      if (enzymeWrapper.nodes.length > 1) {
        return {
          pass: false,
          message: `Cannot verify tag name on a wrapper of multiple nodes. Found ${enzymeWrapper.length} nodes.`, // eslint-disable-line max-len
        };
      }

      return {
        pass: enzymeWrapper.type() === tag,
        message: `Expected node to be of type "${tag}".`,
      };
    }

    return {
      compare(enzymeWrapper:EnzymeObject, tag:string) : Matcher {
        return toHaveTagName(enzymeWrapper, tag);
      },

      negativeCompare(enzymeWrapper:EnzymeObject, tag:string) : Matcher {
        const result:Matcher = toHaveTagName(enzymeWrapper, tag);

        result.message = negateMessage(result.message);
        result.pass = !result.pass;

        return result;
      },
    };
  },
};
