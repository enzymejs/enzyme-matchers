/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toBeEmptyAssertion
 * @flow
 */

import type { EnzymeObject, Matcher } from '../types';
import html from '../utils/html';

export default function toBeEmpty(enzymeWrapper: EnzymeObject): Matcher {
  const pass = enzymeWrapper.length === 0;

  return {
    pass,
    message: `Expected to receive an empty set, but found ${enzymeWrapper.length} nodes.`,
    negatedMessage: 'Expected to receive an non-empty set, but found 0 nodes.',
    contextualInformation: {
      actual: `Found Nodes HTML output: ${html(enzymeWrapper)}`,
    },
  };
}
