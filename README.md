# jasmine-enzyme

[![npm version](https://img.shields.io/npm/v/jasmine-enzyme.svg)](https://www.npmjs.com/package/jasmine-enzyme)
![License](https://img.shields.io/npm/l/chai-enzyme.svg)
[![Circle CI](https://circleci.com/gh/blainekasten/jasmine-enzyme/tree/master.svg?style=svg)](https://circleci.com/gh/blainekasten/jasmine-enzyme/tree/master)

[Jasmine](http://jasmine.github.io/) assertions for [enzyme](https://github.com/airbnb/enzyme/).

Large thanks to [`chai-enzyme`](https://github.com/producthunt/chai-enzyme). We have  taken several thoughts from that library and ultimately hope to maintain feature parity.

## Table of Contents

  1. [Installation](#installation)
  1. [Setup](#setup)
    1. [Jest](#jest)
    1. [Jasmine](#vanilla-jasmine)
  1. [Assertions](#assertions)
    1. [toBeChecked()](#tobechecked)
    1. [toBeDisabled()](#tobedisabled)
    1. [toBeEmpty()](#tobeempty)
    1. [toBePresent()](#tobepresent)
    1. [toContainReact()](#tocontainreactreactinstanceobject)
    1. [toHaveClassName()](#tohaveclassnameclassnamestring)
    1. [toHaveHTML()](#tohavehtmlhtmlstring)
    1. [toHaveProp()](#tohaveproppropkeystring-propvalueany)
    1. [toHaveRef()](#tohaverefrefnamestring)
    1. [toHaveState()](#tohavestatestatekeystring-statevalueany)
    1. [toHaveStyle()](#tohavestylestylekeystring-stylevalueany)
    1. [toHaveTagName()](#tohavetagnametagnamestring)
    1. [toHaveText()](#tohavetexttextstring)
    1. [toHaveValue()](#tohavevaluevalueany)
    1. [toMatchSelector()](#tomatchselectorselectorstring)
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

### Jest
If you are using [jest](https://facebook.github.io/jest/), the simplest setup
is to use jest's `setupTestFrameworkScriptFile` config. You'll also need to
tell jest to unmock `react`, `enzyme`, and `jasmine-enzyme`.

Make sure your `package.json` includes the following:

```js
"jest": {
  "setupTestFrameworkScriptFile": "node_modules/jasmine-enzyme/lib/jest.js",
  "unmockedModulePathPatterns": [
    "react",
    "enzyme",
    "jasmine-enzyme"
  ]
},
```

### Vanilla Jasmine
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

function Fixture() {
  return (
    <div>
      <input id="checked" defaultChecked />
      <input id="not" defaultChecked={false} />
      <input id="tertiary" defaultChecked checked={false} />
    </div>
  );
}

const wrapper = mount(<Fixture />); // mount/render/shallow when applicable

expect(wrapper.find('#checked')).toBeChecked();
expect(wrapper.find('#not')).not.toBeChecked();
```

#### `toBeDisabled()`

| render | mount | shallow |
| -------|-------|-------- |
| no     | yes   | yes     |

Assert that the given wrapper is disabled:

```js
import React from 'react'
import {mount, shallow} from 'enzyme'

function Fixture() {
  return (
    <div>
      <input id="disabled" disabled />
      <input id="not"/>
    </div>
  );
}

const wrapper = mount(<Fixture />); // mount/render/shallow when applicable

expect(wrapper.find('#disabled')).toBeDisabled();
expect(wrapper.find('#not')).not.toBeDisabled();
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

#### `toContainReact(ReactInstance:Object)`

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

expect(wrapper).toContainReact(<User index={1} />);
expect(wrapper).not.toContainReact(<User index={9000} />);
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

#### `toHaveHTML(html:string)`

| render | mount | shallow |
| -------|-------|-------- |
| no     | yes   | yes     |

Assert that the given wrapper has the provided html:

> **Note** Quotations are normalized.

```js
function Fixture() {
  return (
    <div id="root">
      <span id="child">Test</span>
    </div>
  );
}

const wrapper = mount(<Fixture />); // mount/render/shallow when applicable

expect(wrapper.find('#child')).toHaveHTML(
  '<span id="child">Test</span>'
);
```

#### `toHaveProp(propKey:string[, propValue:?any])`

| render | mount | shallow |
| -------|-------|-------- |
| no     | yes   | yes     |

Assert that the given wrapper has the provided propKey and associated value if specified:

```js
function User() { ... }
User.propTypes = {
  foo: PropTypes.string,
  bar: PropTypes.array,
};

function Fixture() {
  return (
    <div id="root">
      <User foo={'baz'} bar={[1,2,3]} />
    </div>
  );
}

const wrapper = mount(<Fixture />); // mount/render/shallow when applicable

expect(wrapper.find(User)).toHaveProp('foo');
expect(wrapper.find(User)).toHaveProp('foo', 'baz');

expect(wrapper.find(User)).toHaveProp('bar');
expect(wrapper.find(User)).toHaveProp('bar', [1,2,3]);
```

#### `toHaveRef(refName:string)`

| render | mount | shallow |
| -------|-------|-------- |
| no     | yes   | no      |

Assert that the mounted wrapper has the provided ref:

```js
class Fixture extends React.Component {
  render() {
    return (
      <div>
        <span ref="child" />
      </div>
    );
  }
}

const wrapper = mount(<Fixture />);

expect(wrapper).toHaveRef('child');
expect(wrapper).not.toHaveRef('foo');
```

#### `toHaveState(stateKey:string[, stateValue:?any])`

| render | mount | shallow |
| -------|-------|-------- |
| no     | yes   | yes     |

Assert that the component has the provided stateKey and optional value if specified:

```js
class Fixture extends React.Component {
  constructor() {
    super();
    this.state = {
      foo: false,
    };
  }

  render() {
    return (
      <div />
    );
  }
}

const wrapper = mount(<Fixture />); // mount/render/shallow when applicable

expect(wrapper).toHaveState('foo');
expect(wrapper).toHaveState('foo', false);
```

#### `toHaveStyle(styleKey:string[, styleValue:?any])`

| render | mount | shallow |
| -------|-------|-------- |
| no     | yes   | yes     |

Assert that the component has style of the provided key and value:

```js
function Fixture() {
  const style1 = { height: '100%' };
  const style2 = { flex: 8 };

  return (
    <div>
      <span id="style1" style={style1} />
      <span id="style2" style={style2} />
    </div>
  );
}

const wrapper = mount(<Fixture />); // mount/render/shallow when applicable

expect(wrapper.find('#style1')).toHaveStyle('height', '100%');
expect(wrapper.find('#style2')).toHaveStyle('flex', 8);
```

#### `toHaveTagName(tagName:string)`

| render | mount | shallow |
| -------|-------|-------- |
| no     | yes   | yes     |

Assert that the wrapper is of a certain tag type:

```js
function Fixture() {
  return (
    <div>
      <span id="span" />
    </div>
  );
}

const wrapper = mount(<Fixture />);

expect(wrapper.find('#span')).toHaveTagName('span');
expect(wrapper.find('#span')).not.toHaveTagName('div');
```

#### `toHaveText(text:string)`

| render | mount | shallow |
| -------|-------|-------- |
| no     | yes   | yes     |

Assert that the wrapper has the provided text:

```js
function Fixture() {
  return (
    <div>
      <p id="full">Text</p>
      <p id="empty"></p>
    </div>
  );
}

const wrapper = mount(<Fixture />); // mount/render/shallow when applicable

expect(wrapper.find('#full')).toHaveText('Text');
expect(wrapper.find('#full')).not.toHaveText('Wrong');

expect(wrapper.find('#full')).toHaveText();
expect(wrapper.find('#empty')).not.toHaveText()
```

#### `toHaveValue(value:any)`

| render | mount | shallow |
| -------|-------|-------- |
| no     | yes   | yes     |

Assert that the given wrapper has the provided `value`:

```js
function Fixture() {
  return (
    <div>
      <input defaultValue="test" />
      <input defaultValue="foo" value="bar" onChange={jest.genMockFunction()} />
    </div>
  );
}

const wrapper = mount(<Fixture />); // mount/render/shallow when applicable

expect(wrapper.find('input').at(0)).toHaveValue('test');
expect(wrapper.find('input').at(1)).toHaveValue('bar');
```

#### `toMatchSelector(selector:string)`

| render | mount | shallow |
| -------|-------|-------- |
| no     | yes   | yes     |

Assert that the wrapper matches the provided `selector`:

```js
function Fixture() {
  return (
    <div>
      <span id="foo" className="bar" />
    </div>
  );
}

const wrapper = mount(<Fixture />); // mount/render/shallow when applicable

expect(wrapper.find('span')).toMatchSelector('span');
expect(wrapper.find('span')).toMatchSelector('#foo');
expect(wrapper.find('span')).toMatchSelector('.bar');
```

## Development

#### Setup

```shell
$ git clone <this repo>
$ cd jasmine-enzyme
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
