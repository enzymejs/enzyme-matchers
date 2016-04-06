/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule JasmineEnzyme
 */

import toBeChecked from './assertions/toBeChecked';

export default function jasmineEnzyme() {
  jasmine.addMatchers(checked);
}
