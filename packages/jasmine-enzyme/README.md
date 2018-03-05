# jasmine-enzyme

[![npm version](https://img.shields.io/npm/v/jasmine-enzyme.svg)](https://www.npmjs.com/package/jasmine-enzyme)
![License](https://img.shields.io/npm/l/chai-enzyme.svg)

### Installation

We suggest using [yarn](https://github.com/yarnpkg/yarn) for installations.

```
yarn add jasmine-enzyme --dev
```

But npm works too!

```
$ npm install jasmine-enzyme --save-dev
```

### Setup

For Jasmine, you'll need to call `jasmineEnzyme()` in any `before` method due to the way jasmine's plugin
system works.

```js
import jasmineEnzyme from 'jasmine-enzyme';

describe('test', () => {
  beforeEach(() => {
    jasmineEnzyme();
  });

  // tests
});
```
