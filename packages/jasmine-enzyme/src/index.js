/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule JasmineEnzyme
 * @flow
 */

import enzymeMatchers from 'enzyme-matchers';
import addMatcher from './addMatcher';

declare var jest: Object;

function jasmineEnzyme(): void {
  // Migration step for moving people from jasmine-enzyme
  // to jest-enzyme
  if (typeof jest !== 'undefined') {
    throw new Error(`
      [jasmine-enzyme] The jest usage has been moved to a new package: "jest-enzyme".
      Use that project instead of this. For more information, see: _______
    `);
  }

  const toJasmineMatcher = (matcherFn: Function) => (
    util: Object,
    customEqualityTesters: Object
  ) => {
    // Convert the equals util from jasmine to share the same interface as jest
    const equals = (actual, expected) =>
      util.equals(actual, expected, customEqualityTesters);
    return {
      compare(...args) {
        const results = matcherFn.call({ equals }, ...args);

        if (results.contextualInformation.actual) {
          results.message += `\nexpected: ${results.contextualInformation
            .actual}`;
        }

        if (results.contextualInformation.expected) {
          results.message += `\nreceived: ${results.contextualInformation
            .expected}`;
        }

        return results;
      },
      negativeCompare(...args) {
        const results = matcherFn.call({ equals }, ...args);

        if (results.contextualInformation.actual) {
          results.negatedMessage += `\nexpected: ${results.contextualInformation
            .actual}`;
        }

        if (results.contextualInformation.expected) {
          results.negatedMessage += `\nreceived: ${results.contextualInformation
            .expected}`;
        }

        return {
          pass: !results.pass,
          message: results.negatedMessage,
        };
      },
    };
  };

  const matchers = Object.keys(enzymeMatchers);

  matchers.forEach((matcher: string) => {
    addMatcher({
      [matcher]: toJasmineMatcher(enzymeMatchers[matcher]),
    });
  });
}

// Also expose enzymeMatchers directly so that the matchers can be added on a per-spec basis
// instead of globally on the jasmine object. This also supports older versions of jasmine where
// jasmine.addMatchers isn't defined and matchers must be added to the spec in a beforeEach().
//
// Add enzymeMatchers as an expando property onto the jasmineEnzyme function for backwards
// compatibility with previous versions of jasmine-enzyme.
jasmineEnzyme.enzymeMatchers = enzymeMatchers;

export default jasmineEnzyme;
