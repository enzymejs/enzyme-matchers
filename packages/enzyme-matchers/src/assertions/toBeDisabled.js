/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toBeDisabledAssertion
 * @flow
 */

import negateMessage from '../negateMessage';
import type { Matcher } from '../../../../types/Matcher';
import type { EnzymeObject } from '../../../../types/EnzymeObject';

export default function toBeDisabled(enzymeWrapper:EnzymeObject) : Matcher {
  const pass = !!enzymeWrapper.prop('disabled');

  return {
    pass,
    message: negateMessage(pass, 'Expected node to be "disabled."'),
  };
}
