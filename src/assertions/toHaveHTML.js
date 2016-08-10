/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toHaveHTML
 * @flow
 */

import negateMessage from '../negateMessage';
import type { Matcher } from '../types/Matcher';
import type { MatcherMethods } from '../types/MatcherMethods';
import type { EnzymeObject } from '../types/EnzymeObject';

export default {
  toHaveHTML() : MatcherMethods {
    function toHaveHTML(enzymeWrapper:EnzymeObject, html:string) : Matcher {
      const wrapperHTML = enzymeWrapper.html();

      // normalize quotes
      const useSingleQuotes = html.search("'") !== -1;

      const actualHTML = wrapperHTML.replace(/("|')/g, useSingleQuotes ? "'" : '"');
      const expectedHTML = html.replace(/("|')/g, useSingleQuotes ? "'" : '"');

      return {
        pass: actualHTML === expectedHTML,
        message: `Expected "${actualHTML}" to equal ${expectedHTML}`,
      };
    }

    return {
      compare(enzymeWrapper:EnzymeObject, html:string) : Matcher {
        return toHaveHTML(enzymeWrapper, html);
      },

      negativeCompare(enzymeWrapper:EnzymeObject, html:string) : Matcher {
        const result:Matcher = toHaveHTML(enzymeWrapper, html);

        result.message = negateMessage(result.message);
        result.pass = !result.pass;

        return result;
      },
    };
  },
};
