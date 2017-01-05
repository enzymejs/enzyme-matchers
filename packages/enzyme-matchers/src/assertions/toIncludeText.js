/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toIncludeTextAssertion
 * @flow
 */

import negateMessage from '../negateMessage';
import type { Matcher } from '../../../../types/Matcher';
import type { EnzymeObject } from '../../../../types/EnzymeObject';

export default function toIncludeText(enzymeWrapper: EnzymeObject, text: ?string): Matcher {
  const actualText = enzymeWrapper.text();
  let pass;

  if (text === undefined) {
    pass = actualText.length > 0;
    return {
      pass,
      message: negateMessage(
        pass,
        'Expected node to include text'
      ),
    };
  }

  pass = actualText.includes(text);

  return {
    pass,
    message: negateMessage(
      pass,
      `Expected "${actualText}" to include "${text}"`
    ),
  };
}
