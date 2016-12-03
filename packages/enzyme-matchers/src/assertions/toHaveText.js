/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toHaveTextAssertion
 * @flow
 */

import type { Matcher } from '../../../../types/Matcher';
import type { EnzymeObject } from '../../../../types/EnzymeObject';

import name from '../utils/name';
import html from '../utils/html';

export default function toHaveText(enzymeWrapper:EnzymeObject, text:?string) : Matcher {
  const actualText = enzymeWrapper.text();
  const wrapperName = `<${name(enzymeWrapper)}>`;
  const wrapperHtml = html(enzymeWrapper);
  let pass;

  if (text === undefined) {
    pass = actualText.length > 0;
    return {
      pass,
      message: `Expected ${wrapperName} node to have text, but it did not.`,
      negatedMessage: `Expected ${wrapperName} node not to have text, but it did`,
      contextualInformation: {
        actual: wrapperHtml,
      },
    };
  }

  pass = actualText === text;

  return {
    pass,
    message: `Expected ${wrapperName} components text to match (using ===), but it did not.`,
    negatedMessage: `Expected ${wrapperName} components text not to match (using ===), but it did.`,
    contextualInformation: {
      actual: actualText,
      expected: text,
    },
  };
}
