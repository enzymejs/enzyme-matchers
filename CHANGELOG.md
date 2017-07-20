3.6.0
=====
  * Implement jest asymettric matchers and jasmine partial matchers!! (@sfargier)
    - This means you can use API's like `expect.any(String)` in jest or `jasmine.stringMatching('%')`
  * Fix a bug with the transpiled code not runnable in browsers (@ek5000)
  * Make the typescript definition for jest-enzyme more accurate (@sfargier)
  * _internal_: enzyme-matchers is built in Prettier now! (@blainekasten)
  * _internal_: Fix a local issue with our yarn.lock (@blainekasten)

3.5.3
=====
  * Point to lib TS file (@pascalduez)

3.5.2
=====
  * Add the missing export of the toMatchElement assertion (@vkrol)

3.5.1
=====
  * Fix the TS definition for `toContainReact` (@pselden)

3.5.0
=====
  * Include TS definitions in exported library (@Dean177)
  * Fix a bug that can occur when you are mocking console.error in your tests. (@juanca)
  * [internal] Use babel-preset-env (@pascalduez)
  * [internal] Improve flowtype usage (@pascalduez)

3.4.0
=====
  * Add toMatchElement TS Declaration (@pascalduez)
  * Prevented `toHaveProps` from mutating arguments (@moredip)
  * Ensure flowtypes are published as part of the packages (@pascalduez)

3.3.0
=====
  * Fix typescript return types (@Dean177)
  * Fix Flowtype integration by not publishing `src/` files (@SBoudrias)
  * NEW! Added `toMatchElement(reactInstance)` matcher (@finnigantime)

3.2.0
=====
  * Publish types for Flow integration support
  * Fix an issue where `console` may not be available in certain environments
  * Expose matchers directly for `jasmine-enzyme`
    * This is particularily benefecial for jasmine v1 users
    * Access if found at `jasmineEnzyme.enzymeMatchers`
  * Fix an issue with using shallow wrappers when running tests in IE

3.1.1
=====
  * Fix a bug when running tests in IE

3.1.0
=====
  * Add Typescript definitions

3.0.1
=====
  * Fix a failed version publish

3.0.0
=====
  * This version updates the requirement for jest-enzyme to jest versions 19 or greater
  * Automatically inject a serializer for enzyme components to be snapshotted
  * Bugfix: Prevent shallow wrappers from being deeply rendered by our internal `html` utils

2.1.2
=====
  * Remove dependency on colors package
  * Fix stringify to not crash on `null` values

2.1.1
=====
  * Fix the way we looked up internals of react for latest version

2.1.0
=====
  * Fix matcher messages from always sounding positive, even when negated

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
