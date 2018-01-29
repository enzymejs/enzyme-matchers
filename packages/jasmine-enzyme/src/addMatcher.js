/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule addMatcher
 * @flow
 */

import type { MatcherMethods } from 'enzyme-matchers';

declare var jasmine: Object;

const coreMatchers = jasmine.matchers;
let errorThrown = false;

export default function addMatcher(matcher: MatcherMethods): void {
  const matcherName = Object.keys(matcher)[0];

  /*
   * only throw one error so the console doesn't
   * become redunant errors
   */
  if (coreMatchers[matcherName] && !errorThrown) {
    errorThrown = true;
    throw new Error(`JasmineEnzyme: Added matcher "${matcherName}" is over-riding
       jasmine-core matcher. You must rename the function to
       not over-ride anything core.`);
  }

  jasmine.addMatchers(matcher);
}
