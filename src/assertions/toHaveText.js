/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toHaveText
 * @flow
 */

import negateMessage from '../negateMessage';
import type { Matcher } from '../types/Matcher';
import type { MatcherMethods } from '../types/MatcherMethods';
import type { EnzymeObject } from '../types/EnzymeObject';

export default {
  toHaveText() : MatcherMethods {
    function toHaveText(enzymeWrapper:EnzymeObject, text:?string) : Matcher {
      const actualText = enzymeWrapper.text();

      if (text === undefined) {
        return {
          pass: actualText.length > 0,
          message: 'Expected node to have text',
        };
      }

      return {
        pass: actualText === text,
        message: `Expected "${actualText}" to equal "${text}"`,
      };
    }

    return {
      compare(enzymeWrapper:EnzymeObject, text:?string) : Matcher {
        return toHaveText(enzymeWrapper, text);
      },

      negativeCompare(enzymeWrapper:EnzymeObject, text:?string) : Matcher {
        const result:Matcher = toHaveText(enzymeWrapper, text);

        result.message = negateMessage(result.message);
        result.pass = !result.pass;

        return result;
      },
    };
  },
};
