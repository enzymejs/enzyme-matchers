/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toHavePropAssertion
 * @flow
 */

import negateMessage from '../negateMessage';
import deepEqualIdent from 'deep-equal-ident';
import type { Matcher } from '../../../../types/Matcher';
import type { EnzymeObject } from '../../../../types/EnzymeObject';

export default function toHaveProp(
  enzymeWrapper:EnzymeObject,
  propKey:string,
  propValue:?any
) : Matcher {
  const props = enzymeWrapper.props();

  // error if the prop doesnt exist
  if (!props.hasOwnProperty(propKey)) {
    return {
      pass: false,
      message: `Expected wrapper to have prop "${propKey}"`,
    };
  }

  // key exists given above check, and we're not validating over values,
  // so its always true
  if (propValue === undefined) {
    return {
      pass: true,
      message: '',
    };
  }

  const pass = deepEqualIdent(props[propKey], propValue);

  return {
    pass,
    message: negateMessage(
      pass,
      `Expected wrappers prop values to match for key "${propKey}":
        Actual: ${JSON.stringify(props[propKey])}
        Expected: ${JSON.stringify(propValue)}
      `
    ),
  };
}
