# eslint-config-jest-enzyme

[![npm version](https://img.shields.io/npm/v/eslint-config-jest-enzyme.svg)](https://www.npmjs.com/package/eslint-config-jest-enzyme)
![License](https://img.shields.io/npm/l/chai-enzyme.svg)

### Installation

We suggest using [yarn](https://github.com/yarnpkg/yarn) for installations.

```
yarn add eslint-config-jest-enzyme --dev
```

But npm works too!

```
$ npm install eslint-config-jest-enzyme --save-dev
```

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
