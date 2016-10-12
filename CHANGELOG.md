2.0.0
=====
  * **Changed project structure!**
  * We are now using lerna to maintain 3 npm packages:
    * `enzyme-matchers` (_simple functions to handle assertions_)
    * `jasmine-enzyme` (_implementation of enzyme-matchers in jasmine_)
    * `jest-enzyme` (_implementation of enzyme-matchers in jest)

  * This is only breaking if you use Jest.
    * If you do, simply change to use the `jest-enzyme` package and everything should work.


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
