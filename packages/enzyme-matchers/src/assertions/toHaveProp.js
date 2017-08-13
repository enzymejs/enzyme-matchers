/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toHavePropAssertion
 * @flow
 */

import deepEqualIdent from 'deep-equal-ident';
import type { EnzymeObject, Matcher } from '../types';
import name from '../utils/name';
import stringify from '../utils/stringify';
import single from '../utils/single';

function toHaveProp(
  enzymeWrapper: EnzymeObject,
  propKey: string,
  propValue?: any
): Matcher {
  const props = enzymeWrapper.props();
  const contextualInformation = {
    actual: `Actual: ${stringify({ [propKey]: props[propKey] })}`,
    expected: `Expected: ${stringify({ [propKey]: propValue })}`,
  };

  // error if the prop doesnt exist
  if (!props.hasOwnProperty(propKey)) {
    contextualInformation.actual = '';

    return {
      pass: false,
      message: `Expected wrapper to have prop "${propKey}", but it did not.`,
      negatedMessage: `Expected wrapper not to have prop "${propKey}", but it did.`,
      contextualInformation,
    };
  }

  // key exists given above check, and we're not validating over values,
  // so its always true unless the undefined value was provided explicitly
  if (propValue === undefined && arguments.length === 2) {
    return {
      pass: true,
      message: `Expected wrapper to have any value for the prop "${propKey}"`,
      negatedMessage: `Expected wrapper not to receive the prop "${propKey}"`,
      contextualInformation,
    };
  }

  const equals = this && this.equals ? this.equals : deepEqualIdent;
  const pass = equals(props[propKey], propValue);

  return {
    pass,
    message: `Expected <${name(
      enzymeWrapper
    )}> "${propKey}" prop values to match but they didn't.`,
    negatedMessage: `Expected <${name(
      enzymeWrapper
    )}> "${propKey}" prop values not to match, but they did.`,
    contextualInformation,
  };
}

export default single(toHaveProp);
