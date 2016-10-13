/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toHaveClassNameAssertion
 * @flow
 */

import negateMessage from '../negateMessage';
import type { Matcher } from '../../../../types/Matcher';
import type { EnzymeObject } from '../../../../types/EnzymeObject';

export default function toHaveClassName(enzymeWrapper:EnzymeObject, className:string) : Matcher {
  let normalizedClassName = className.split(' ').join('.');

  if (normalizedClassName[0] !== '.') {
    normalizedClassName = `.${normalizedClassName}`;
  }

  const pass = enzymeWrapper.is(normalizedClassName);

  return {
    pass,
    message: negateMessage(
      pass,
      `Expected "${enzymeWrapper.html()}" to have className of ${className} but instead found ${enzymeWrapper.props('className')}` // eslint-disable-line max-len
    ),
  };
}
