# enzyme-matchers

![License](https://img.shields.io/npm/l/chai-enzyme.svg)
[![Circle CI](https://circleci.com/gh/blainekasten/enzyme-matchers/tree/master.svg?style=svg)](https://circleci.com/gh/blainekasten/enzyme-matchers/tree/master)

An assertion library for [enzyme](https://github.com/airbnb/enzyme/).

This library supports several testing frameworks including [Jest](https://github.com/facebook/jest) and [Jasmine](http://jasmine.github.io/).

> _Want to add support for another testing framework? Check out our [contributing](#contributing) doc!_

### Readme's for each package:

* [enzyme-matchers](/packages/enzyme-matchers/README.md)
* [jasmine-enzyme](/packages/jasmine-enzyme/README.md)
* [jest-enzyme](/packages/jest-enzyme/README.md)

## Assertions

> Notes
> * The syntax for using these assertions may be different depending on your testing framework. For more information, visit the framework you are using's package README in `packages/`

> * Not all assertions work with every rendering strategy.
>   If you are wondering what rendering mechanism to use when, refer to
>   [enzyme's documentation](https://github.com/airbnb/enzyme).

* [toBeChecked()](#tobechecked)
* [toBeDisabled()](#tobedisabled)
* [toBeEmpty()](#tobeempty)
* [toBePresent()](#tobepresent)
* [toContainReact()](#tocontainreactreactinstanceobject)
* [toHaveClassName()](#tohaveclassnameclassnamestring)
* [toHaveHTML()](#tohavehtmlhtmlstring)
* [toHaveProp()](#tohaveproppropkeystring-propvalueany)
* [toHaveRef()](#tohaverefrefnamestring)
* [toHaveState()](#tohavestatestatekeystring-statevalueany)
* [toHaveStyle()](#tohavestylestylekeystring-stylevalueany)
* [toHaveTagName()](#tohavetagnametagnamestring)
* [toHaveText()](#tohavetexttextstring)
* [toIncludeText()](#toincludetexttextstring)
* [toHaveValue()](#tohavevaluevalueany)
* [toMatchElement()](#tomatchelementreactinstanceobject)
* [toMatchSelector()](#tomatchselectorselectorstring)

_Other_

1. [Development](#development)
1. [Contributing](#contributing)
1. [License](#license)

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

#### `toContainReact(reactInstance:Object)`

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
  index: PropTypes.number.isRequired
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
expect(wrapper.find('#empty')).not.toHaveText();
```

#### `toIncludeText(text:string)`

| render | mount | shallow |
| -------|-------|-------- |
| no     | yes   | yes     |

Assert that the wrapper includes the provided text:

```js
function Fixture() {
  return (
    <div>
      <p id="full">Some important text</p>
    </div>
  );
}

const wrapper = mount(<Fixture />); // mount/render/shallow when applicable

expect(wrapper.find('#full')).toIncludeText('important');
expect(wrapper.find('#full')).not.toIncludeText('Wrong');
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

#### `toMatchElement(reactInstance:Object)`

| render | mount | shallow |
| -------|-------|-------- |
| no     | yes   | yes     |

Assert the wrapper matches the provided react instance. This is a matcher form of Enzyme's wrapper.matchesElement(), which returns a bool with no indication of what caused a failed match. This matcher includes the actual and expected debug trees as contextual information when it fails. NOTE: The semantics are slightly different than enzyme's wrapper.matchesElement(), which ignores props. This matcher does consider props when comparing the actual to the expected values.

Example:

```js
function Fixture() {
  return (
    <div>
      <span id="foo" className="bar" />
    </div>
  );
}

const wrapper = shallow(<Fixture />); // mount/render/shallow when applicable

expect(wrapper).toMatchElement(<Fixture />);
expect(wrapper.find('span')).toMatchElement(
  <span id="foo" className="bar" />
);
expect(wrapper).not.toMatchElement(<div />);
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
$ cd enzyme-matchers
$ npm install
$ lerna bootstrap
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

This project uses [lerna](https://github.com/lerna/lerna)

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
