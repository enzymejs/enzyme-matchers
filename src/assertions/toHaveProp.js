/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toHaveProp
 * @flow
 */

export default {
  toHaveProp(util:Object, customEqualityTesters:Object) : Object {
    return {
      compare(enzymeWrapper:Object, propKey:string, propValue:any) : Object {
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
          };
        }

        return {
          pass: util.equals(props[propKey], propValue, customEqualityTesters),
          message: `
            Expected wrappers prop values to match for key "${propKey}":
            Actual: ${JSON.stringify(props[propKey])}
            Expected: ${JSON.stringify(propValue)}
          `,
        };
      },
    };
  },
};
