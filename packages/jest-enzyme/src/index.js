/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule setupTestFrameworkScriptFile
 * @flow
 */

import enzymeMatchers from 'enzyme-matchers';

import type { MatcherMethods } from '../../../types/MatcherMethods';
declare var expect:Function;

// add methods!
beforeEach(() => {
  const matchers = {};

  Object.keys(enzymeMatchers).forEach(matcherKey => {
    const matcher = {
      [matcherKey](actual, expected) {
        const result = enzymeMatchers[matcherKey](actual, expected);

        if (this.isNot) {
          result.message = result.negatedMessage;
        }

        // TODO: Remove when fully implemented in enzyme-matchers
        result.contextualInformation = result.contextualInformation || {};

        if (result.contextualInformation.expected) {
          result.message += '\n' + this.utils.RECEIVED_COLOR(result.contextualInformation.expected);
        }

        if (result.contextualInformation.actual) {
          result.message += '\n' + this.utils.EXPECTED_COLOR(result.contextualInformation.actual);
        }

        return result;
      },
    }[matcherKey];

    matchers[matcherKey] = matcher;
  });

  expect.extend(matchers);
});
