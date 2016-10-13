/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toHaveStyleAssertion
 * @flow
 */

import negateMessage from '../negateMessage';
import deepEqualIdent from 'deep-equal-ident';
import type { Matcher } from '../../../../types/Matcher';
import type { EnzymeObject } from '../../../../types/EnzymeObject';

export default function toHaveStyle(
  enzymeWrapper:EnzymeObject,
  styleKey:string,
  styleValue:?any
) : Matcher {
  const style = enzymeWrapper.prop('style');

  // error if component doesnt have style
  if (!style) {
    return {
      pass: false,
      message: 'Expected component to have a style prop',
    };
  }

  // error if the style key doesnt exist
  if (!style.hasOwnProperty(styleKey)) {
    return {
      pass: false,
      message: `Expected component to have style key of "${styleKey}"`,
    };
  }

  const pass = deepEqualIdent(style[styleKey], styleValue);

  return {
    pass,
    message: negateMessage(
      pass,
      `Expected component style values to match for key "${styleKey}":
        Actual: ${style[styleKey]}
        Expected: ${styleValue}
      `
    ),
  };
}
