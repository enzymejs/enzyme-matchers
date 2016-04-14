/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toHaveStyle
 * @flow
 */

export default {
  toHaveStyle(util:Object, customEqualityTesters:Object) : Object {
    return {
      compare(enzymeWrapper:Object, styleKey:string, styleValue:any) : Object {
        const style = enzymeWrapper.prop('style');

        // error if component doesnt have style
        if (!style) {
          return {
            pass: false,
            message: 'Expected component to have a style prop',
          };
        }

        // error if the style key doesnt exist
        if (!style.hasOwnProperty(styleKey)) {
          return {
            pass: false,
            message: `Expected component to have style key of "${styleKey}"`,
          };
        }

        return {
          pass: util.equals(style[styleKey], styleValue, customEqualityTesters),
          message: `
            Expected component style values to match for key "${styleKey}":
            Actual: ${style[styleKey]}
            Expected: ${styleValue}
          `,
        };
      },
    };
  },
};
