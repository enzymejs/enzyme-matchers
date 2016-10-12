"use strict";

var jsdom = require('jsdom').jsdom;

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

const shallow = require('enzyme').shallow;
const mount = require('enzyme').mount;
const React = require('react');
const jasmineEnzyme = require('../lib/index.js');

describe('addMatchers', () => {
  beforeEach(jasmineEnzyme);

  it('adds toBeChecked', () => {
    const Fixture = require('./fixtures/toBeChecked.fixture');
    const wrapper = shallow(React.createElement(Fixture));

    expect(wrapper.find('#checked')).toBeChecked();
  });

  it('adds toBeDisabled', () => {
    const Fixture = require('./fixtures/toBeDisabled.fixture');
    const wrapper = shallow(React.createElement(Fixture));

    expect(wrapper.find('#disabled')).toBeDisabled();
  });

  it('adds toBeEmpty', () => {
    const Fixture = require('./fixtures/toBeEmpty.fixture');
    const wrapper = shallow(React.createElement(Fixture));

    expect(wrapper.find('.doesnt-match')).toBeEmpty();
  });

  it('adds toBePresent', () => {
    const Fixture = require('./fixtures/toBePresent.fixture');
    const wrapper = shallow(React.createElement(Fixture));

    expect(wrapper.find('span')).toBePresent();
  });

  it('adds toContainReact', () => {
    const Fixture = require('./fixtures/toContainReact.fixture').Fixture;
    const User = require('./fixtures/toContainReact.fixture').User;
    const wrapper = shallow(React.createElement(Fixture));

    expect(wrapper).toContainReact(React.createElement(User, {index:1}));
  });

  it('adds toHaveClassName', () => {
    const Fixture = require('./fixtures/toHaveClassName.fixture');
    const wrapper = shallow(React.createElement(Fixture));

    expect(wrapper.find('.foo')).toHaveClassName('foo');
  });

  it('adds toHaveHTML', () => {
    const Fixture = require('./fixtures/toHaveHTML.fixture').Fixture;
    const html = require('./fixtures/toHaveHTML.fixture').html;
    const wrapper = shallow(React.createElement(Fixture));

    expect(wrapper.find('#child')).toHaveHTML(html);
  });

  it('adds toHaveProp', () => {
    const Fixture = require('./fixtures/toHaveProp.fixture');
    const wrapper = shallow(React.createElement(Fixture));

    expect(wrapper.find('User')).toHaveProp('name');
    expect(wrapper.find('User')).toHaveProp('name', 'blaine');
  });

  it('adds toHaveRef', () => {
    class Fixture extends React.Component {
      render() {
        return React.createElement(
          'div', {ref: 'ref'}
        );
      }
    }
    const wrapper = mount(React.createElement(Fixture));

    expect(wrapper).toHaveRef('ref');
  });

  it('adds toHaveState', () => {
    const Fixture = require('./fixtures/toHaveState.fixture');
    const wrapper = shallow(React.createElement(Fixture));

    expect(wrapper).toHaveState('foo');
    expect(wrapper).toHaveState('foo', false);
  });

  it('adds toHaveStyle', () => {
    const Fixture = require('./fixtures/toHaveStyle.fixture');
    const wrapper = shallow(React.createElement(Fixture));

    expect(wrapper.find('#style1')).toHaveStyle('height', '100%');
    expect(wrapper.find('#style2')).toHaveStyle('flex', 8);
  });

  it('adds toHaveTagName', () => {
    const Fixture = require('./fixtures/toHaveTagName.fixture');
    const wrapper = shallow(React.createElement(Fixture));

    expect(wrapper.find('#span')).toHaveTagName('span');
  });

  it('adds toHaveText', () => {
    const Fixture = require('./fixtures/toHaveText.fixture');
    const wrapper = shallow(React.createElement(Fixture));

    expect(wrapper.find('#full')).toHaveText('Test');
    expect(wrapper.find('#full')).toHaveText();
  });

  it('adds toHaveValue', () => {
    const Fixture = require('./fixtures/toHaveValue.fixture');
    const wrapper = shallow(React.createElement(Fixture));

    expect(wrapper.find('input').first()).toHaveValue('test');
  });

  it('adds toMatchSelector', () => {
    const Fixture = require('./fixtures/toMatchSelector.fixture');
    const wrapper = shallow(React.createElement(Fixture));

    expect(wrapper.find('span')).toMatchSelector('span');
    expect(wrapper.find('#child')).toMatchSelector('#child');
    expect(wrapper.find('.foo')).toMatchSelector('.foo');
  });
});
