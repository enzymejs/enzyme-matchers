# jest-enzyme

[![npm version](https://img.shields.io/npm/v/jest-enzyme.svg)](https://www.npmjs.com/package/jest-enzyme)
![License](https://img.shields.io/npm/l/chai-enzyme.svg)

### Installation

We suggest using [yarn](https://github.com/yarnpkg/yarn) for installations.

```
yarn add jest-enzyme --dev
```

But npm works too!

```
$ npm install jest-enzyme --save-dev
```

### Setup

The simplest setup is to use jest's `setupTestFrameworkScriptFile` config.

> On older versions of Jest,
> you'll also need to tell jest to unmock `react`, `enzyme`, and `jest-enzyme`.

Make sure your `package.json` includes the following:

```js
"jest": {
  "setupTestFrameworkScriptFile": "./node_modules/jest-enzyme/lib/index.js",

  // old versions of jest set the unmocks
  "unmockedModulePathPatterns": [
    "react",
    "enzyme",
    "jest-enzyme"
  ]
},
```

### Jest Enzyme Environment

There is a special environment to simplify using enzyme with jest. Check it out [here](/packages/jest-environment-enzyme#readme)

#### Usage with [Create React App](https://github.com/facebookincubator/create-react-app)

If you are using Create React App, instead of adding to your `package.json` as above, you will need to add a `src/setupTests.js` file to your app, to import jest-enzyme:

 ``` js
 // src/setupTests.js
 import 'jest-enzyme';
 ```

 This is documented on Create React App at the bottom of the [Testing Components](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#testing-components) section. There is also more information about [Initializing Test Environment](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#initializing-test-environment).

#### Usage with TypeScript

As with Create React App, when using jest-enzyme with [TypeScript](http://typescriptlang.org/) and [ts-jest](https://github.com/kulshekhar/ts-jest), you'll need to add a `setupTests.ts` file to your app that explicitly imports jest-enzyme, and point the `setupTestFrameworkScriptFile` field in your `package.json` file towards it:

 ``` typescript
 // src/setupTests.ts
 import 'jest-enzyme';
 ```
 
 ```js
"jest": {
  "setupTestFrameworkScriptFile": "./src/setupTests.ts",
},
```

This ensures that the type definitions bundled with jest-enzyme (which add extra Jest matchers and globals like `shallow` and `mount`) are included in your TypeScript project.
