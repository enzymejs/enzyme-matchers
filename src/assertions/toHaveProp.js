/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toHaveProp
 * @flow
 */

export default {
  toHaveProp(util, customEqualityTesters) : Object {
    return {
      compare(enzymeWrapper:Object, propKey:string, propValue:any) : Object {
        const prop = enzymeWrapper.prop(propKey);

        // error if the prop doesnt exist
        // if propValue isn't supplied just validate prop exists
        if (!prop || propValue === undefined) {
          return {
            pass: !!prop,
            message: `Expected wrapper to have prop "${propKey}"`,
          };
        }

        return {
          pass: util.equals(prop, propValue, customEqualityTesters),
          message: `
            Expected wrappers prop values to match for key "${propKey}":
            Actual: ${JSON.stringify(prop)}
            Expected: ${JSON.stringify(propValue)}
          `,
        };
      },
    };
  },
};
