/* eslint-disable new-cap */
/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule setupTestFrameworkScriptFile
 * @flow
 */

import enzymeMatchers from 'enzyme-matchers';
import serializer from 'enzyme-to-json/serializer';

declare var expect: Function;
declare var beforeEach: Function;

// add the snapshot serializer for Enzyme wrappers
expect.addSnapshotSerializer(serializer);

// add methods!
beforeEach(() => {
  const matchers = {};

  Object.keys(enzymeMatchers).forEach(matcherKey => {
    const matcher = {
      [matcherKey](wrapper, ...args) {
        const result = enzymeMatchers[matcherKey].call(this, wrapper, ...args);

        let message = this.isNot ? result.negatedMessage : result.message;

        if (result.contextualInformation.expected) {
          message += `\n${this.utils.RECEIVED_COLOR(
            result.contextualInformation.expected
          )}`;
        }

        if (result.contextualInformation.actual) {
          message += `\n${this.utils.EXPECTED_COLOR(
            result.contextualInformation.actual
          )}`;
        }

        return {
          ...result,
          message: () => message,
        };
      },
    }[matcherKey];

    matchers[matcherKey] = matcher;
  });

  expect.extend(matchers);
});
