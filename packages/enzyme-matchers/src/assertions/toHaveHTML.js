/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toHaveHTMLAssertion
 * @flow
 */

import type { Matcher } from '../../../../types/Matcher';
import type { EnzymeObject } from '../../../../types/EnzymeObject';
import name from '../utils/name';

export default function toHaveHTML(enzymeWrapper:EnzymeObject, html:string) : Matcher {
  switch (enzymeWrapper.nodes.length) {
  case 0:
    throw new Error('EnzymeMatchers::toHaveHTML must be called on a single node, not an empty node.');
  case 1:
    break;
  default:
    throw new Error('EnzymeMatchers::toHaveHTML must be called on a single node, not multiple nodes.');
  }

  const wrapperHTML = enzymeWrapper.html();

  // normalize quotes
  const useSingleQuotes = html.search("'") !== -1;

  const actualHTML = wrapperHTML.replace(/("|')/g, useSingleQuotes ? "'" : '"');
  const expectedHTML = html.replace(/("|')/g, useSingleQuotes ? "'" : '"');

  const pass = actualHTML === expectedHTML;

  return {
    pass,
    message: `Expected <${name(enzymeWrapper)}> html to match the expected, but it didn't.`,
    negatedMessage: `Expected <${name(enzymeWrapper)}> html not to match the expected, but it did.`,
    contextualInformation: {
      actual: `Actual HTML: ${actualHTML}`,
      expected: `Expected HTML: ${expectedHTML}`,
    },
  };
}
