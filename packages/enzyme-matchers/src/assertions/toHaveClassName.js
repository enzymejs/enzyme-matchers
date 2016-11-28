/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toHaveClassNameAssertion
 * @flow
 */

import type { Matcher } from '../../../../types/Matcher';
import type { EnzymeObject } from '../../../../types/EnzymeObject';
import name from '../utils/name';
import html from '../utils/html';

export default function toHaveClassName(enzymeWrapper:EnzymeObject, className:string) : Matcher {
  let normalizedClassName = className.split(' ').join('.');

  if (normalizedClassName[0] !== '.') {
    normalizedClassName = `.${normalizedClassName}`;
  }

  const pass = enzymeWrapper.is(normalizedClassName);

  const actualClassName = enzymeWrapper.prop('className');

  return {
    pass,
    message: `Expected <${name(enzymeWrapper)}> to have className of "${normalizedClassName}" but instead found ".${actualClassName}"`, // eslint-disable-line max-len
    negatedMessage: `Expected <${name(enzymeWrapper)}> to have className of "${normalizedClassName}" but instead found ".${actualClassName}"`, // eslint-disable-line max-len
    contextualInformation: {
      actual: `Found node output: ${html(enzymeWrapper)}`,
    },
  };
}
