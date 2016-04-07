/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toHaveClassName
 * @flow
 */

export default {
  toHaveClassName() : Object {
    return {
      compare(enzymeWrapper:Object, className:string) : Object {
        let normalizedClassName = className.split(' ').join('.');

        if (normalizedClassName[0] !== '.') {
          normalizedClassName = `.${normalizedClassName}`;
        }

        return {
          pass: enzymeWrapper.is(normalizedClassName),
          message: `Expected "${enzymeWrapper.html()}" to have className of ${className} but instead found ${enzymeWrapper.props('className')}`, // eslint-disable-line max-len
        };
      },
    };
  },
};
