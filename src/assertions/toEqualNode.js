/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toEqualNode
 * @flow
 */

import React from 'react';
import {shallow} from 'enzyme';
import negateMessage from '../negateMessage';
import type {Matcher} from '../types/Matcher';
import type {MatcherMethods} from '../types/MatcherMethods';
import type {EnzymeObject} from '../types/EnzymeObject';

function isReactElement(thing) {
    return thing['$$typeof'] === (<div/>)['$$typeof'];
}

function isShallowWrapper(thing) {
    return thing.constructor.name === 'ShallowWrapper';
}

export default {
    // this matcher only works on shallow wrappers
    toEqualNode(): MatcherMethods {
        function toEqualNode(enzymeWrapper: EnzymeObject, reactInstance: Object): Matcher {
            if (!isShallowWrapper(enzymeWrapper)) {
                throw new TypeError('actual must be an enzyme shallow wrapper');
            } else if (!isReactElement(reactInstance)) {
                throw new TypeError('expected must be a react element');
            }

            return {
                pass: enzymeWrapper.equals(reactInstance),
                message: `expected wrapper: \n${enzymeWrapper.html()}\n*****\nto contain: ${shallow(reactInstance)
                    .html()}`
            }
        }

        return {
            compare(enzymeWrapper: EnzymeObject, reactInstance: Object): Matcher {
                return toEqualNode(enzymeWrapper, reactInstance);
            },
            negativeCompare(enzymeWrapper: EnzymeObject, reactInstance: Object): Matcher {
                const result = toEqualNode(enzymeWrapper, reactInstance);
                return {pass: !result.pass, message: negateMessage(result.message)};
            }
        }
    }
};
