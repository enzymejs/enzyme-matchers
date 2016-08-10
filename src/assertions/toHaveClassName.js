/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toHaveClassName
 * @flow
 */

import negateMessage from '../negateMessage';
import type { Matcher } from '../types/Matcher';
import type { MatcherMethods } from '../types/MatcherMethods';
import type { EnzymeObject } from '../types/EnzymeObject';

export default {
  toHaveClassName() : MatcherMethods {
    function toHaveClassName(enzymeWrapper:EnzymeObject, className:string) : Matcher {
      let normalizedClassName = className.split(' ').join('.');

      if (normalizedClassName[0] !== '.') {
        normalizedClassName = `.${normalizedClassName}`;
      }

      return {
        pass: enzymeWrapper.is(normalizedClassName),
        message: `Expected "${enzymeWrapper.html()}" to have className of ${className} but instead found ${enzymeWrapper.props('className')}`, // eslint-disable-line max-len
      };
    }

    return {
      compare(enzymeWrapper:EnzymeObject, className:string) : Matcher {
        return toHaveClassName(enzymeWrapper, className);
      },

      negativeCompare(enzymeWrapper:EnzymeObject, className:string) : Matcher {
        const result:Matcher = toHaveClassName(enzymeWrapper, className);

        result.message = negateMessage(result.message);
        result.pass = !result.pass;

        return result;
      },
    };
  },
};
