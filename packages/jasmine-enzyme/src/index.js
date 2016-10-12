/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule JasmineEnzyme
 * @flow
 */

import addMatcher from './addMatcher';
import enzymeMatchers from 'enzyme-matchers';

export default function jasmineEnzyme() : void {
  [
    'toBeChecked', 'toBeDisabled', 'toBeEmpty',
    'toBePresent', 'toContainReact', 'toHaveClassName',
    'toHaveHTML', 'toHaveProp', 'toHaveRef',
    'toHaveState', 'toHaveStyle', 'toHaveTagName',
    'toHaveText', 'toHaveValue', 'toMatchSelector',
  ].forEach((matcher:string) => {
    addMatcher({
      [matcher]: () => {
        return { compare: enzymeMatchers[matcher] };
      },
    });
  });
}
