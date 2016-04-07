/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule JasmineEnzyme
 */

import toBeChecked from './assertions/toBeChecked';
import toBeDisabled from './assertions/toBeDisabled';
import toBeEmpty from './assertions/toBeEmpty';
import toBePresent from './assertions/toBePresent';
import toContain from './assertions/toContain';
import toHaveClassName from './assertions/toHaveClassName';
import toHaveHTML from './assertions/toHaveHTML';
import toHaveProp from './assertions/toHaveProp';
import toHaveRef from './assertions/toHaveRef';
import toHaveTagName from './assertions/toHaveTagName';
import toHaveValue from './assertions/toHaveValue';
import toMatch from './assertions/toMatch';

export default function jasmineEnzyme() : void {
  jasmine.addMatchers(toBeChecked);
  jasmine.addMatchers(toBeDisabled);
  jasmine.addMatchers(toBeEmpty);
  jasmine.addMatchers(toBePresent);
  jasmine.addMatchers(toContain);
  jasmine.addMatchers(toHaveClassName);
  jasmine.addMatchers(toHaveHTML);
  jasmine.addMatchers(toHaveProp);
  jasmine.addMatchers(toHaveRef);
  jasmine.addMatchers(toHaveTagName);
  jasmine.addMatchers(toHaveValue);
  jasmine.addMatchers(toMatch);
}
