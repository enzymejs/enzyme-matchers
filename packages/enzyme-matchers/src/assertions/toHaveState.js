/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toHaveStateAssertion
 * @flow
 */

import type { EnzymeObject, Matcher, ObjectReductionResponse } from '../types';
import name from '../utils/name';
import reduceAssertionObject from '../utils/reduceAssertionObject';
import stringify from '../utils/stringify';
import single from '../utils/single';

function toHaveState(
  enzymeWrapper: EnzymeObject,
  stateKey: Object | string,
  stateValue?: any
): Matcher {
  const state = enzymeWrapper.state();
  const wrapperName = name(enzymeWrapper);

  // The API allows to check if a component has a prop in general by dropping the third
  // argument.
  if (
    stateValue === undefined &&
    arguments.length === 2 &&
    typeof stateKey !== 'object' &&
    Array.isArray(stateKey) === false
  ) {
    return {
      pass: state.hasOwnProperty(stateKey),
      message: `Expected <${wrapperName}> to have any value for the prop "${stateKey}"`,
      negatedMessage: `Expected <${wrapperName}> not to receive the prop "${stateKey}"`,
      contextualInformation: {
        actual: `Actual props: ${stringify({ [stateKey]: state[stateKey] })}`,
        expected: `Expected props: ${stringify({ [stateKey]: stateValue })}`,
      },
    };
  }

  const results: ObjectReductionResponse = reduceAssertionObject.call(
    this,
    state,
    stateKey,
    stateValue
  );
  const unmatchedKeys = results.unmatchedKeys.join(', ');
  const contextualInformation = {
    actual: `Actual state: ${stringify(results.actual)}`,
    expected: `Expected state: ${stringify(results.expected)}`,
  };

  // error if some state doesn't exist
  if (results.missingKeys.length) {
    const missingKeys = results.missingKeys.join(', ');
    return {
      pass: false,
      message: `Expected <${wrapperName}> component state to have keys of "${missingKeys}"`,
      negatedMessage: `Expected <${wrapperName}> component state to not contain a key of "${missingKeys}".`,
      contextualInformation,
    };
  }

  return {
    pass: results.pass,
    message: `Expected <${wrapperName}> component state values to match for keys "${unmatchedKeys}" but they didn't.`,
    negatedMessage: `Expected <${wrapperName}> component state values to be different for keys "${unmatchedKeys}" but they didn't.`,
    contextualInformation,
  };
}

export default single(toHaveState);
