# jest-environment-enzyme

[![npm version](https://img.shields.io/npm/v/jest-environment-enzyme.svg)](https://www.npmjs.com/package/jest-environment-enzyme)
![License](https://img.shields.io/npm/l/chai-enzyme.svg)

### Installation

We suggest using [yarn](https://github.com/yarnpkg/yarn) for installations.

```
yarn add jest-environment-enzyme --dev
```

But npm works too!

```
$ npm install jest-environment-enzyme --save-dev
```

### Setup

With this library, you don't need to have your app install enzyme, or an enzyme-adapter. We'll take care of it for you!

Setup should be test set the `testEnvironment` to `enzyme` in your `package.json`.

```js
"jest": {
  "testEnvironment": "enzyme",
},
```

Additionally, you can specify which enzyme adapter you want to use through the `testEnvironmentOptions.enzymeAdapter`.

Valid options are:

* `react13`
* `react14`
* `react15`
* `react15.4`
* `react16` (default)

```js
// package.json
"jest": {
  "testEnvironment": "enzyme",
  "testEnvironmentOptions": {
    "enzymeAdapter": "react16"
  }
}
```

*Lastly, and _most importantly_*, this library has a hard requirement on `jest-enzyme`.
