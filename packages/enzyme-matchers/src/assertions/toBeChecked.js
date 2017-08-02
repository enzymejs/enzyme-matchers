/*
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toBeCheckedAssertion
 * @flow
 */

import type { EnzymeObject, Matcher } from '../types';
import getNodeName from '../utils/name';
import html from '../utils/html';
import single from '../utils/single';

function toBeChecked(enzymeWrapper: EnzymeObject): Matcher {
  let pass: boolean = false;

  const props: Object = enzymeWrapper.props();

  // set to the default checked
  if (props.hasOwnProperty('defaultChecked')) {
    pass = props.defaultChecked || false;
  }

  // if it has the checked property, CHECK that.
  if (props.hasOwnProperty('checked')) {
    pass = props.checked;
  }

  return {
    pass,
    message: `Expected "${getNodeName(
      enzymeWrapper
    )}" to be checked but it wasn't.`,
    negatedMessage: `Expected "${getNodeName(
      enzymeWrapper
    )}" not to be checked but it was.`,
    contextualInformation: {
      actual: `Node HTML output: ${html(enzymeWrapper)}`,
    },
  };
}

export default single(toBeChecked);
