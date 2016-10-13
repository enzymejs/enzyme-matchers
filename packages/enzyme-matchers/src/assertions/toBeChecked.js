/*
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toBeCheckedAssertion
 * @flow
 */

import negateMessage from '../negateMessage';
import type { EnzymeObject } from '../../../../types/EnzymeObject';
import type { Matcher } from '../../../../types/Matcher';

export default function toBeChecked(enzymeWrapper:EnzymeObject) : Matcher {
  let pass:boolean = false;

  const props:Object = enzymeWrapper.props();

  // set to the default checked
  if (props.hasOwnProperty('defaultChecked')) {
    pass = props.defaultChecked;
  }

  // if it has the checked property, CHECK that.
  if (props.hasOwnProperty('checked')) {
    pass = props.checked;
  }

  return {
    pass,
    message: negateMessage(pass, `Expected "${enzymeWrapper.html()}" to be checked.`),
  };
}
