/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule JasmineEnzyme
 * @flow
 */

import addMatcher from './addMatcher';
import enzymeMatchers from 'enzyme-matchers';

declare var jest:Object;

export default function jasmineEnzyme() : void {
  // Migration step for moving people from jasmine-enzyme
  // to jest-enzyme
  if (typeof jest !== 'undefined') {
    throw new Error(`
      [jasmine-enzyme] The jest usage has been moved to a new package: "jest-enzyme".
      Use that project instead of this. For more information, see: _______
    `);
  }

  const matchers = Object.keys(enzymeMatchers);

  matchers.forEach((matcher:string) => {
    addMatcher({
      [matcher]: () => ({ compare: enzymeMatchers[matcher] }),
    });
  });
}
