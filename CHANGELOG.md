1.2.0
=====
  * Fixed negated matchers output message to sound negated.

1.1.0
=====
  * Add `toHaveText` matcher

1.0.1
=====
  * Include `repository` in package.json

1.0.0
=====
  * Rename `toContain` to `toContainReact` to prevent core matcher overwrite
  * Rename `toMatch` to `toMatchSelector` to prevent core matcher overwrite

0.2.3
=====
  * Remove `jasmine` from the `peerDependencies` list
    * Jasmine is implicity with the library
    * the peerDep caused issues with npm2 and jest

0.2.2
=====
0.2.1 was a failed release
  * Fix flowtype issues

0.2.0
=====
  * Add `toHaveStyle` matcher

0.1.0
=====
  * Initial Implementation
