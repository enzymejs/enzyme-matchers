/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule enzyme-matchrs
 * @flow
 */

import toBeChecked from './assertions/toBeChecked';
import toBeDisabled from './assertions/toBeDisabled';
import toBeEmpty from './assertions/toBeEmpty';
import toBePresent from './assertions/toBePresent';
import toContainReact from './assertions/toContainReact';
import toHaveClassName from './assertions/toHaveClassName';
import toHaveHTML from './assertions/toHaveHTML';
import toHaveProp from './assertions/toHaveProp';
import toHaveRef from './assertions/toHaveRef';
import toHaveState from './assertions/toHaveState';
import toHaveStyle from './assertions/toHaveStyle';
import toHaveTagName from './assertions/toHaveTagName';
import toHaveText from './assertions/toHaveText';
import toIncludeText from './assertions/toIncludeText';
import toHaveValue from './assertions/toHaveValue';
import toMatchSelector from './assertions/toMatchSelector';
import toMatchElement from './assertions/toMatchElement';

export default {
  toBeChecked,
  toBeDisabled,
  toBeEmpty,
  toBePresent,
  toContainReact,
  toHaveClassName,
  toHaveHTML,
  toHaveProp,
  toHaveRef,
  toHaveState,
  toHaveStyle,
  toHaveTagName,
  toHaveText,
  toIncludeText,
  toHaveValue,
  toMatchSelector,
  toMatchElement,
};

export type { EnzymeObject, Matcher, MatcherMethods } from './types';
