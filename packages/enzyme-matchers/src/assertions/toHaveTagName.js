/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toHaveTagNameAssertion
 * @flow
 */

import negateMessage from '../negateMessage';
import type { Matcher } from '../../../../types/Matcher';
import type { EnzymeObject } from '../../../../types/EnzymeObject';

export default function toHaveTagName(enzymeWrapper:EnzymeObject, tag:string) : Matcher {
  if (enzymeWrapper.nodes.length > 1) {
    return {
      pass: false,
      message: `Cannot verify tag name on a wrapper of multiple nodes. Found ${enzymeWrapper.length} nodes.`, // eslint-disable-line max-len
    };
  }

  const pass = enzymeWrapper.type() === tag;

  return {
    pass,
    message: negateMessage(
      pass,
      `Expected node to be of type "${tag}".`
    ),
  };
}
