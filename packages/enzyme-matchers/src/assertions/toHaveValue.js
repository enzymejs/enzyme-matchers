/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toHaveValueAssertion
 * @flow
 */

import negateMessage from '../negateMessage';
import type { Matcher } from '../../../../types/Matcher';
import type { EnzymeObject } from '../../../../types/EnzymeObject';

export default function toHaveValue(enzymeWrapper:EnzymeObject, expectedValue:any) : Matcher {
  let pass = false;

  const props = enzymeWrapper.props();

  // set to the default checked
  if (props.hasOwnProperty('defaultValue')) {
    pass = props.defaultValue === expectedValue;
  }

  // if it has the `value` property, CHECK that
  if (props.hasOwnProperty('value')) {
    pass = props.value === expectedValue;
  }

  return {
    pass,
    message: negateMessage(
      pass,
      `Expected "${enzymeWrapper.html()}" to have value of "${expectedValue}"`
    ),
  };
}
