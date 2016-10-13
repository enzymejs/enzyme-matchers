/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toHaveStateAssertion
 * @flow
 */

import negateMessage from '../negateMessage';
import deepEqualIdent from 'deep-equal-ident';
import type { Matcher } from '../../../../types/Matcher';
import type { EnzymeObject } from '../../../../types/EnzymeObject';

export default function toHaveState(
  enzymeWrapper:EnzymeObject,
  stateKey:string,
  stateValue:?any
) : Matcher {
  const state = enzymeWrapper.state();

  // error if the state key doesnt exist
  if (!state.hasOwnProperty(stateKey)) {
    return {
      pass: false,
      message: `Expected component state to have key of "${stateKey}"`,
    };
  }

  // key exists given above check, and we're not validating over values,
  // so its always true
  if (stateValue === undefined) {
    return {
      pass: true,
      message: `Expected component state to have key of "${stateKey}"`,
    };
  }

  const pass = deepEqualIdent(state[stateKey], stateValue);

  return {
    pass,
    message: negateMessage(
      pass,
      `Expected component state values to match for key "${stateKey}":
        Actual: ${JSON.stringify(state)}
        Expected: ${JSON.stringify(stateValue)}
      `
    ),
  };
}
