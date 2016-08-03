/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toBeChecked
 * @flow
 */

import negateMessage from '../negateMessage';
import type { Matcher } from '../types/Matcher';
import type { MatcherMethods } from '../types/MatcherMethods';
import type { EnzymeObject } from '../types/EnzymeObject';

export default {
  toBeChecked() : MatcherMethods {
    function toBeChecked(enzymeWrapper:EnzymeObject) : Matcher {
      let pass:boolean = false;

      const props:Object = enzymeWrapper.props();

      // set to the default checked
      if (props.hasOwnProperty('defaultChecked')) {
        pass = props.defaultChecked;
      }

      // if it has the checked property, CHECK that.
      if (props.hasOwnProperty('checked')) {
        pass = props.checked;
      }

      return {
        pass,
        message: `Expected "${enzymeWrapper.html()}" to be checked.`,
      };
    }

    return {
      compare(enzymeWrapper:EnzymeObject) : Matcher {
        return toBeChecked(enzymeWrapper);
      },

      negativeCompare(enzymeWrapper:EnzymeObject) : Matcher {
        const result:Matcher = toBeChecked(enzymeWrapper);

        result.message = negateMessage(result.message);
        result.pass = !result.pass;

        return result;
      },
    };
  },
};
