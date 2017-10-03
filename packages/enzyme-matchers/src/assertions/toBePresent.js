/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toBePresentAssertion
 * @flow
 */

import type { EnzymeObject, Matcher } from '../types';
import html from '../utils/html';
import getNodeName from '../utils/name';

export default function toBePresent(enzymeWrapper: EnzymeObject): Matcher {
  const pass = enzymeWrapper.length !== 0;

  const contextualInformation = {};

  if (enzymeWrapper.getElements().length) {
    contextualInformation.actual = `Found Nodes: ${html(enzymeWrapper)}`;
  }

  return {
    pass,
    message: `Expected "${getNodeName(
      enzymeWrapper
    )}.toBePresent()" results to contain at least one node, instead found none.`,
    negatedMessage: `Expected "${getNodeName(
      enzymeWrapper
    )}.not.toBePresent()" selector results to contain 0 nodes, instead found ${enzymeWrapper.getElements()
      .length}.`,
    contextualInformation,
  };
}
