/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toHaveTagName
 * @flow
 */

export default {
  toHaveTagName() : Object {
    return {
      compare(enzymeWrapper:Object, tag:string) : Object {
        if (enzymeWrapper.nodes.length > 1) {
          return {
            pass: false,
            message: `Cannot verify tag name on a wrapper of multiple nodes. Found ${enzymeWrapper.length} nodes.`, // eslint-disable-line max-len
          };
        }

        return {
          pass: enzymeWrapper.type() === tag,
          message: `Expected node to be of type "${tag}".`,
        };
      },
    };
  },
};
