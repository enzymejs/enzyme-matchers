/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toMatchSelectorAssertion
 * @flow
 */

import negateMessage from '../negateMessage';
import type { Matcher } from '../../../../types/Matcher';
import type { EnzymeObject } from '../../../../types/EnzymeObject';

export default function toMatchSelector(enzymeWrapper:EnzymeObject, selector:string) : Matcher {
  const pass = enzymeWrapper.is(selector);

  return {
    pass,
    message: negateMessage(
      pass,
      `Expected to match "${selector}".`
    ),
  };
}
