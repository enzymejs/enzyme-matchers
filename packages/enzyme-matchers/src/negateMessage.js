/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule negateMessage2
 * @flow
 *
 * Every message has the word "to" in it
 * to describe what was expected, we just insert
 * "not" before it when it's negated.
 */

export default function negateMessage(skipReplace:boolean, message:string) : string {
  if (skipReplace) {
    return message;
  }

  return message.replace(' to ', ' not to ');
}
