/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toHaveState
 * @flow
 */

export default {
  toHaveState(util:Object, customEqualityTesters:Object) : Object {
    return {
      compare(enzymeWrapper:Object, stateKey:string, stateValue:any) : Object {
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
          };
        }

        return {
          pass: util.equals(state[stateKey], stateValue, customEqualityTesters),
          message: `
            Expected component state values to match for key "${stateKey}":
            Actual: ${JSON.stringify(state)}
            Expected: ${JSON.stringify(stateValue)}
          `,
        };
      },
    };
  },
};
