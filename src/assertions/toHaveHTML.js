/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toHaveHTML
 * @flow
 */

export default {
  toHaveHTML() : Object {
    return {
      compare(enzymeWrapper:Object, html:string) : Object {
        const wrapperHTML = enzymeWrapper.html();

        // normalize quotes
        const useSingleQuotes = html.search("'") !== -1;

        const actualHTML = wrapperHTML.replace(/("|')/g, useSingleQuotes ? "'" : '"');
        const expectedHTML = html.replace(/("|')/g, useSingleQuotes ? "'" : '"');

        return {
          pass: actualHTML === expectedHTML,
          message: `Expected "${actualHTML}" to equal ${expectedHTML}`,
        };
      },
    };
  },
};
