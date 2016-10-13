/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toHaveTextAssertion
 * @flow
 */

import negateMessage from '../negateMessage';
import type { Matcher } from '../../../../types/Matcher';
import type { EnzymeObject } from '../../../../types/EnzymeObject';

export default function toHaveText(enzymeWrapper:EnzymeObject, text:?string) : Matcher {
  const actualText = enzymeWrapper.text();
  let pass;

  if (text === undefined) {
    pass = actualText.length > 0;
    return {
      pass,
      message: negateMessage(
        pass,
        'Expected node to have text'
      ),
    };
  }

  pass = actualText === text;

  return {
    pass,
    message: negateMessage(
      pass,
      `Expected "${actualText}" to equal "${text}"`
    ),
  };
}
