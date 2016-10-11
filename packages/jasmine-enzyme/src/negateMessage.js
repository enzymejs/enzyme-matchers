/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule negateMessage
 *
 * Every message has the word "to" in it
 * to describe what was expected, we just insert
 * "not" before it.
 */

export default function negateMessage(message:string) : string {
  return message.replace(' to ', ' not to ');
}
