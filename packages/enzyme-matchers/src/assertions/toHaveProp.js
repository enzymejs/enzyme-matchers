/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toHavePropAssertion
 * @flow
 */

import type { EnzymeObject, Matcher, ObjectReductionResponse } from '../types';
import name from '../utils/name';
import reduceAssertionObject from '../utils/reduceAssertionObject';
import stringify from '../utils/stringify';
import single from '../utils/single';

function toHaveProp(
  enzymeWrapper: EnzymeObject,
  propKey: string | Object,
  propValue?: any
): Matcher {
  const props = enzymeWrapper.props();
  const wrapperName = name(enzymeWrapper);

  // The API allows to check if a component has a prop in general by dropping the third
  // argument.
  if (
    propValue === undefined &&
    arguments.length === 2 &&
    typeof propKey !== 'object' &&
    Array.isArray(propKey) === false
  ) {
    return {
      pass: props.hasOwnProperty(propKey),
      message: `Expected <${wrapperName}> to have any value for the prop "${propKey}"`,
      negatedMessage: `Expected <${wrapperName}> not to receive the prop "${propKey}"`,
      contextualInformation: {
        actual: `Actual props: ${stringify({ [propKey]: props[propKey] })}`,
        expected: `Expected props: ${stringify({ [propKey]: propValue })}`,
      },
    };
  }

  const results: ObjectReductionResponse = reduceAssertionObject.call(
    this,
    props,
    propKey,
    propValue
  );
  const unmatchedKeys = results.unmatchedKeys.join(', ');
  const contextualInformation = {
    actual: `Actual props: ${stringify(results.actual)}`,
    expected: `Expected props: ${stringify(results.expected)}`,
  };

  // error if some prop doesn't exist
  if (results.missingKeys.length) {
    const missingKeys = results.missingKeys.join(', ');
    return {
      pass: false,
      message: `Expected <${wrapperName}}> component to have props "${missingKeys}", but it did not.`,
      negatedMessage: `Expected <${wrapperName}> component to not have a props "${missingKeys}", but it did.`,
      contextualInformation,
    };
  }

  return {
    pass: results.pass,
    message: `Expected <${wrapperName}> "${unmatchedKeys}" prop values to match but they didn't.`,
    negatedMessage: `Expected <${wrapperName}> "${unmatchedKeys}" prop values not to match, but they did.`,
    contextualInformation,
  };
}

export default single(toHaveProp);
