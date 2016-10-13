/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toHaveHTMLAssertion
 * @flow
 */

import negateMessage from '../negateMessage';
import type { Matcher } from '../../../../types/Matcher';
import type { EnzymeObject } from '../../../../types/EnzymeObject';

export default function toHaveHTML(enzymeWrapper:EnzymeObject, html:string) : Matcher {
  const wrapperHTML = enzymeWrapper.html();

  // normalize quotes
  const useSingleQuotes = html.search("'") !== -1;

  const actualHTML = wrapperHTML.replace(/("|')/g, useSingleQuotes ? "'" : '"');
  const expectedHTML = html.replace(/("|')/g, useSingleQuotes ? "'" : '"');

  const pass = actualHTML === expectedHTML;

  return {
    pass,
    message: negateMessage(
      pass,
      `Expected "${actualHTML}" to equal ${expectedHTML}`
    ),
  };
}
