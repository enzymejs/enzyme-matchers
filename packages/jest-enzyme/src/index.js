/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule setupTestFrameworkScriptFile
 * @flow
 */

import enzymeMatchers from 'enzyme-matchers';

import type { MatcherMethods } from '../../../types/MatcherMethods';
declare var beforeEach:Function

// add methods!
beforeEach(function jasmineEnzyme() : void {
  const matchers = Object.keys(enzymeMatchers);

  matchers.forEach((matcher:string) => {
    addMatcher({
      [matcher]: () => {
        return { compare: enzymeMatchers[matcher] };
      },
    });
  });
})


function addMatcher(matcher: MatcherMethods) : void {
  const matcherName = Object.keys(matcher)[0];

  /*
   * only throw one error so the console doesn't
   * become redunant errors
   */
  if (jasmine.matchers[matcherName] && !errorThrown) {
    errorThrown = true;
    throw new Error(
      `JestEnzyme: Added matcher "${matcherName}" is over-riding
       core matcher. You must rename the function to not destroy core.`
    );
  }

  // will transition to jest when https://github.com/facebook/jest/issues/1835
  // is merged
  jasmine.addMatchers(matcher);
}
