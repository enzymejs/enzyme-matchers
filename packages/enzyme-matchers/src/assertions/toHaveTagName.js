/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toHaveTagNameAssertion
 * @flow
 */

import type { Matcher } from '../../../../types/Matcher';
import type { EnzymeObject } from '../../../../types/EnzymeObject';

import name from '../utils/name';
import html from '../utils/html';

export default function toHaveTagName(enzymeWrapper:EnzymeObject, tag:string) : Matcher {
  const wrapperHtml = html(enzymeWrapper);
  if (enzymeWrapper.nodes.length > 1) {
    const message = `Cannot verify tag name on a wrapper of multiple nodes. Found ${enzymeWrapper.length} nodes.`; // eslint-disable-line max-len

    return {
      pass: false,
      message,
      negatedMessage: message,
      contextualInformation: {
        actual: wrapperHtml,
        blah: true
      },
    };
  }

  const actualTag = typeof enzymeWrapper.type() === 'function'
    ? enzymeWrapper.type().name
    : enzymeWrapper.type();

  const pass = actualTag === tag;

  const wrapperName = `<${name(enzymeWrapper)}>`

  return {
    pass,
    message: `Expected ${wrapperName} node to equal (using ===) type "${tag}" but it is a "${actualTag}".`,
    negatedMessage: `Expected ${wrapperName} node not to equal (using ===) type "${tag}" but it is that type.`,
    contextualInformation: {
      actual: wrapperHtml,
    },
  };
}
