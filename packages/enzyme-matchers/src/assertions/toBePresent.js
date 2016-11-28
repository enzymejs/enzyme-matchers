/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toBePresentAssertion
 * @flow
 */

import negateMessage from '../negateMessage';
import type { Matcher } from '../../../../types/Matcher';
import type { EnzymeObject } from '../../../../types/EnzymeObject';
import html from '../utils/html';

export default function toBePresent(enzymeWrapper:EnzymeObject) : Matcher {
  const pass = enzymeWrapper.length !== 0;

  const contextualInformation = {};

  if (enzymeWrapper.nodes.length) {
    contextualInformation.actual = `Found Nodes: ${html(enzymeWrapper)}`;
  }

  return {
    pass,
    message: `Expected results to contain at least one node, instead found none.`,
    negatedMessage: `Expected selector results to contain at 0 nodes, instead found ${enzymeWrapper.nodes.length}.`,
    contextualInformation,
  };
}
