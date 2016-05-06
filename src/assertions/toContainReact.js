/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toContainReact
 * @flow
 */

import { shallow } from 'enzyme';

export default {
  toContainReact() : Object {
    return {
      compare(enzymeWrapper:Object, reactInstance:Object) : Object {
        const wrappedInstance = shallow(reactInstance);

        return {
          pass: enzymeWrapper.contains(reactInstance),
          message: `Expected wrapper to contain ${wrappedInstance.html()}.`,
        };
      },
    };
  },
};
