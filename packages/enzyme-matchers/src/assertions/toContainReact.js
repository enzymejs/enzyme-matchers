/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toContainReactAssertion
 * @flow
 */

import { shallow } from 'enzyme';
import negateMessage from '../negateMessage';
import type { Matcher } from '../../../../types/Matcher';
import type { EnzymeObject } from '../../../../types/EnzymeObject';

export default function toContainReact(enzymeWrapper:EnzymeObject, reactInstance:Object) : Matcher {
  const wrappedInstance:EnzymeObject = shallow(reactInstance);
  const pass = enzymeWrapper.contains(reactInstance);

  return {
    pass,
    message: negateMessage(
      pass,
      `Expected wrapper to contain ${wrappedInstance.html()}.`
    ),
  };
}
