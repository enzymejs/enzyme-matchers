/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule setupTestFrameworkScriptFile
 * @flow
 */

import jasmineEnzyme from 'jasmine-enzyme';

declare var beforeEach:Function

beforeEach(jasmineEnzyme);
