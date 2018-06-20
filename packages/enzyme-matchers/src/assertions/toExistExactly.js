/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toBePresentAssertion
 * @flow
 */

import type { EnzymeObject, Matcher } from '../types';
import html from '../utils/html';

export default function toExist(
  enzymeWrapper: EnzymeObject,
  expectedLength
): Matcher {
  if (!Number.isFinite(expectedLength)) {
    return {
      pass: false,
      message: 'Expected a number of elements to be defined',
    };
  }

  const actualLength = enzymeWrapper.length;
  const contextualInformation =
    actualLength > 0 ? { actual: `Found Nodes: ${html(enzymeWrapper)}` } : {};

  return {
    pass: actualLength === expectedLength,
    message: `Expected ${expectedLength} nodes, instead found ${actualLength}`,
    negatedMessage: `Expected not to find ${expectedLength} nodes, but exactly that many were found`,
    contextualInformation,
  };
}
