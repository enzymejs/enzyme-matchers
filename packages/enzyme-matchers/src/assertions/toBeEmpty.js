/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toBeEmptyAssertion
 * @flow
 */

import negateMessage from '../negateMessage';
import type { Matcher } from '../../../../types/Matcher';
import type { EnzymeObject } from '../../../../types/EnzymeObject';

export default function toBeEmpty(enzymeWrapper:EnzymeObject) : Matcher {
  const pass = enzymeWrapper.length === 0;

  return {
    pass,
    message: negateMessage(
      pass,
      `Expected selector to return an empty set, but found ${enzymeWrapper.length} nodes.`
    ), // eslint-disable-line max-len
  };
}
