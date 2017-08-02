/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toHaveStyleAssertion
 * @flow
 */

import deepEqualIdent from 'deep-equal-ident';
import type { EnzymeObject, Matcher } from '../types';
import name from '../utils/name';
import stringify from '../utils/stringify';
import html from '../utils/html';
import single from '../utils/single';

function toHaveStyle(
  enzymeWrapper: EnzymeObject,
  styleKey: string,
  styleValue?: any
): Matcher {
  const style = enzymeWrapper.prop('style');

  // error if component doesnt have style
  if (!style) {
    return {
      pass: false,
      message: `Expected <${name(
        enzymeWrapper
      )}> component to have a style prop but it did not.`,
      negatedMessage: `Expected <${name(
        enzymeWrapper
      )}> component not to have a style prop but it did.`,
      contextualInformation: {
        actual: html(enzymeWrapper),
      },
    };
  }

  // error if the style key doesnt exist
  if (!style.hasOwnProperty(styleKey)) {
    return {
      pass: false,
      message: `Expected <${name(
        enzymeWrapper
      )}> component to have a style key of "${styleKey}" but it did not.`,
      negatedMessage: `Expected <${name(
        enzymeWrapper
      )}> component not to have a style key of "${styleKey}" but it did.`,
      contextualInformation: {
        actual: html(enzymeWrapper),
      },
    };
  }

  const equals = this && this.equals ? this.equals : deepEqualIdent;
  const pass = equals(style[styleKey], styleValue);

  return {
    pass,
    message: `Expected <${name(
      enzymeWrapper
    )}> component style values to match for key "${styleKey}", but they didn't`,
    negatedMessage: `Expected <${name(
      enzymeWrapper
    )}> component style values to be different for key "${styleKey}", but they weren't`,
    contextualInformation: {
      actual: `Actual: ${stringify({ [styleKey]: style[styleKey] })}`,
      expected: `Expected: ${stringify({ [styleKey]: styleValue })}`,
    },
  };
}

export default single(toHaveStyle);
