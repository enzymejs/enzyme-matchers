/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toContainReactAssertion
 * @flow
 */

import { shallow } from 'enzyme';
import type { Matcher } from '../../../../types/Matcher';
import type { EnzymeObject } from '../../../../types/EnzymeObject';
import html from '../utils/html';
import getNodeName from '../utils/name';
import single from '../utils/single';

function toContainReact(enzymeWrapper:EnzymeObject, reactInstance:Object) : Matcher {
  const wrappedInstance:EnzymeObject = shallow(reactInstance);
  const pass = enzymeWrapper.contains(reactInstance);

  return {
    pass,
    message: `Expected <${getNodeName(enzymeWrapper)}> to contain ${wrappedInstance.html()} but it was not found.`,
    negatedMessage: `Expected <${getNodeName(enzymeWrapper)}> not to contain ${wrappedInstance.html()} but it does.`,
    contextualInformation: {
      actual: `HTML Output of <${getNodeName(enzymeWrapper)}>:\n ${html(enzymeWrapper)}`,
    },
  };
}

export default single(toContainReact);
