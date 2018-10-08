# eslint-config-jest-enzyme

[![npm version](https://img.shields.io/npm/v/eslint-config-jest-enzyme.svg)](https://www.npmjs.com/package/eslint-config-jest-enzyme)
![License](https://img.shields.io/npm/l/chai-enzyme.svg)

### Overview

This library is only useful if you are using [`jest-environment-enzyme`](/packages/jest-environment-enzyme). When you are using that library, React and enzyme specific variables are globalized. This lint config lets eslint know about those globals and not warn about them.

### Setup

Add this extend to your eslint file:

```js
{
  "extends": [
    "jest-enzyme"
  ]
}
```

This configuration only applies to test files that end in `*.test.js`.
