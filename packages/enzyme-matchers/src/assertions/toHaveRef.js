/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toHaveRefAssertion
 * @flow
 */

import type { Matcher } from '../../../../types/Matcher';
import type { EnzymeObject } from '../../../../types/EnzymeObject';
import name from '../utils/name';

export default function toHaveRef(enzymeWrapper:EnzymeObject, refName:string) : Matcher {
  const { node } = enzymeWrapper.ref(refName);
  const pass = !!node;

  return {
    pass,
    message: `Expected to find a ref named "${refName}" on <${name(enzymeWrapper)}>, but didn't.`,
    negatedMessage: `Expected not to find a ref named "${refName}" on <${name(enzymeWrapper)}>, but did.`,
    contextualInformation: {}
  };
}
