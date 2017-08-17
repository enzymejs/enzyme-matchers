/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toHaveStateAssertion
 * @flow
 */

import deepEqualIdent from 'deep-equal-ident';
import type { EnzymeObject, Matcher } from '../types';
import name from '../utils/name';
import stringify from '../utils/stringify';
import single from '../utils/single';

function toHaveState(
  enzymeWrapper: EnzymeObject,
  stateKey: string,
  stateValue?: any
): Matcher {
  const state = enzymeWrapper.state();

  // error if the state key doesnt exist
  if (!state.hasOwnProperty(stateKey)) {
    return {
      pass: false,
      message: `Expected <${name(
        enzymeWrapper
      )}> component state to have key of "${stateKey}"`,
      negatedMessage: `Expected <${name(
        enzymeWrapper
      )}> component state to not contain a key of "${stateKey}".`,
      contextualInformation: {
        actual: `Actual ${stringify({ [stateKey]: state[stateKey] })}`,
        expected: `Expected state: ${stringify({ [stateKey]: stateValue })}`,
      },
    };
  }

  // key exists given above check, and we're not validating over values,
  // so its always true unless the undefined value was provided explicitly
  if (stateValue === undefined && arguments.length === 2) {
    return {
      pass: true,
      message: `Expected <${name(
        enzymeWrapper
      )}> component state to have key of "${stateKey}"`,
      negatedMessage: `Expected <${name(
        enzymeWrapper
      )}> component state to not contain a key of "${stateKey}".`,
      contextualInformation: {
        actual: `Actual ${stringify({ [stateKey]: state[stateKey] })}`,
        expected: `Expected state: ${stringify({ [stateKey]: stateValue })}`,
      },
    };
  }

  const equals = this && this.equals ? this.equals : deepEqualIdent;
  const pass = equals(state[stateKey], stateValue);

  return {
    pass,
    message: `Expected <${name(
      enzymeWrapper
    )}> component state values to match for key "${stateKey}" but they didn't.`,
    negatedMessage: `Expected <${name(
      enzymeWrapper
    )}> component state values to be different for key "${stateKey}" but they didn't.`,
    contextualInformation: {
      actual: `Actual ${stringify({ [stateKey]: state[stateKey] })}`,
      expected: `Expected state: ${stringify({ [stateKey]: stateValue })}`,
    },
  };
}

export default single(toHaveState);
