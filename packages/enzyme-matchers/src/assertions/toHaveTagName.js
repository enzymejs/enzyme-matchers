/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toHaveTagNameAssertion
 * @flow
 */

import type { EnzymeObject, Matcher } from '../types';
import name from '../utils/name';
import html from '../utils/html';
import single from '../utils/single';

function toHaveTagName(enzymeWrapper: EnzymeObject, tag: string): Matcher {
  const wrapperHtml = html(enzymeWrapper);
  const actualTag = enzymeWrapper.name();
  const pass = actualTag === tag;

  const wrapperName = `<${name(enzymeWrapper)}>`;

  return {
    pass,
    message: `Expected ${wrapperName} node to equal (using ===) type "${tag}" but it is a "${actualTag}".`,
    negatedMessage: `Expected ${wrapperName} node not to equal (using ===) type "${tag}" but it is that type.`,
    contextualInformation: {
      actual: wrapperHtml,
    },
  };
}

export default single(toHaveTagName);
