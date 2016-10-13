/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toHaveRefAssertion
 * @flow
 */

import negateMessage from '../negateMessage';
import type { Matcher } from '../../../../types/Matcher';
import type { EnzymeObject } from '../../../../types/EnzymeObject';

export default function toHaveRef(enzymeWrapper:EnzymeObject, refName:string) : Matcher {
  const { node } = enzymeWrapper.ref(refName);
  const pass = !!node;

  return {
    pass,
    message: negateMessage(
      pass,
      `Expected to find a ref "${refName}"`
    ),
  };
}
