/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toContainReact
 * @flow
 */

import { shallow } from 'enzyme';
import negateMessage from '../negateMessage';
import type { Matcher } from '../types/Matcher';
import type { MatcherMethods } from '../types/MatcherMethods';
import type { EnzymeObject } from '../types/EnzymeObject';

export default {
  toContainReact() : MatcherMethods {
    function toContainReact(enzymeWrapper:EnzymeObject, reactInstance:Object) : Matcher {
      const wrappedInstance:EnzymeObject = shallow(reactInstance);

      return {
        pass: enzymeWrapper.contains(reactInstance),
        message: `Expected wrapper to contain ${wrappedInstance.html()}.`,
      };
    }

    return {
      compare(enzymeWrapper:EnzymeObject, reactInstance:Object) : Matcher {
        return toContainReact(enzymeWrapper, reactInstance);
      },

      negativeCompare(enzymeWrapper:EnzymeObject, reactInstance:Object) : Matcher {
        const result:Matcher = toContainReact(enzymeWrapper, reactInstance);

        result.message = negateMessage(result.message);
        result.pass = !result.pass;

        return result;
      },
    };
  },
};
