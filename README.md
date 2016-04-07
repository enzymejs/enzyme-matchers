# jasmine-enzyme

![License](https://img.shields.io/npm/l/chai-enzyme.svg)

Jasmine assertions for enzyme.

Large thanks to [`chai-enzyme`](https://github.com/producthunt/chai-enzyme). We have  taken several thoughts from that library and ultimately hope to maintain feature parity. 

## Table of Contents

  1. [Installation](#installation)
  1. [Setup](#setup)
    1. [Jest](#jest)
    1. [Jasmine](#vanilla-jasmine)
  1. [Assertions](#assertions)
    1. [toBeChecked()](#tobechecked)
    1. [toBeEmpty()](#tobeempty)
    1. [toBePresent()](#tobepresent)
    1. [toContain()](#tocontain)
    1. [toHaveClassName()](#tohaveclassname)
  1. [Development](#development)
  1. [Contributing](#contributing)
  1. [License](#license)

## Installation

`jasmine-enzyme` depends on:


```js
"peerDependencies": {
  "jasmine": "1.x || 2.x",
  "enzyme": "1.x || 2.x"
}
```

```
$ npm install jasmine-enzyme --save-dev
```

## Setup

###### Jest
If you are using [jest](https://facebook.github.io/jest/), the simplest setup is to use jests `setupTestFrameworkScriptFile` command. Add this to your `package.json`

```js
"jest": {
  "setupTestFrameworkScriptFile": "node_modules/jasmine-enzyme/jest",
}
```

###### Vanilla Jasmine
If you are just using vanilla jasmine, you'll need to call
`jasmineEnzyme()` in any `before` method due to the way jasmine's plugin
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

## Assertions

> Note that not all assertions work with every rendering strategy.

> If you are wondering what rendering mechanism to use when, refer to
> [enzyme's documentation](https://github.com/airbnb/enzyme).

#### `toBeChecked()`

| render | mount | shallow |
| -------|-------|-------- |
| no     | yes   | yes     |

Assert that the given wrapper is checked:

```js
import React from 'react'
import {mount, shallow} from 'enzyme'

class Fixture extends React.Component {
  render () {
    return (
      <div>
        <input id="checked" defaultChecked />
        <input id="not" defaultChecked={false} />
        <input id="tertiary" defaultChecked checked={false} />
      </div>
    );
  }
}

const wrapper = mount(<Fixture />); // mount/render/shallow when applicable

expect(wrapper.find('#checked')).toBeChecked();
expect(wrapper.find('#not')).not.toBeChecked();
```

#### `toBeEmpty()`

| render | mount | shallow |
| -------|-------|-------- |
| no     | yes   | yes     |

Assert that the given wrapper is empty:

```js
function Fixture() {
  return (
    <div>
      <span className="foo" />
      <span className="bar baz" />
    </div>
  );
}

const wrapper = mount(<Fixture />); // mount/render/shallow when applicable

expect(wrapper.find('ul')).toBeEmpty();
expect(wrapper.find('span')).not.toBeEmpty();
```

#### `toBePresent()`

| render | mount | shallow |
| -------|-------|-------- |
| no     | yes   | yes     |

Opposite of [`toBeEmpty()`](#toBeEmpty). Assert that the given wrapper has children of any length:

```js
function Fixture() {
  return (
    <div>
      <span className="foo" />
      <span className="bar baz" />
    </div>
  );
}

const wrapper = mount(<Fixture />); // mount/render/shallow when applicable

expect(wrapper.find('span')).toBePresent();
expect(wrapper.find('ul')).not.toBePresent();
```

#### `toContain(ReactInstance:Object)`

| render | mount | shallow |
| -------|-------|-------- |
| no     | yes   | yes     |

Assert that the given wrapper contains the provided react instance:

```js
class User extends React.Component {
  render () {
    return (
      <span>User {this.props.index}</span>
    )
  }
}

User.propTypes = {
  index: React.PropTypes.number.isRequired
}

class Fixture extends React.Component {
  render () {
    return (
      <div>
        <ul>
          <li><User index={1} /></li>
          <li><User index={2} /></li>
        </ul>
      </div>
    )
  }
}

const wrapper = mount(<Fixture />); // mount/render/shallow when applicable

expect(wrapper).toContain(<User index={1} />);
expect(wrapper).not.toContain(<User index={9000} />);
```

#### `toHaveClassName(className:string)`

| render | mount | shallow |
| -------|-------|-------- |
| no     | yes   | yes     |

Assert that the given wrapper has the provided className:

```js
function Fixture() {
  return (
    <div>
      <span className="foo" />
      <span className="bar baz" />
    </div>
  );
}

const wrapper = mount(<Fixture />); // mount/render/shallow when applicable

expect(wrapper.find('.foo')).toHaveClassName('foo');
expect(wrapper.find('.foo')).not.toHaveClassName('baz');

expect(wrapper.find('.bar')).toHaveClassName('bar baz');
expect(wrapper.find('.bar')).toHaveClassName('baz');
```
## Development

#### Setup

```shell
$ git clone <this repo>
$ cd jasmein-enzyme
$ npm install
```

#### Tests

Linters:

```shell
$ npm run lint
```

Tests:

```shell
$ npm test
```

## Contributing

We want to make this assertion library as robust and complete as possible. If you think that there are missing features/assertions, please open a GitHub issue or even better - a PR.

Bug reports and pull requests are welcome on GitHub. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org/) code of conduct.

## License

```
 _________________
< The MIT License >
 -----------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```
