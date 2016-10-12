const { shallow, mount } = require('enzyme');
const React = require('react');
const jasmineEnzyme = require.requireActual('../../');

describe('addMatchers', () => {
  beforeEach(jasmineEnzyme);

  it('adds toBeChecked', () => {
    const Fixture = require.requireActual('./toBeChecked.fixture');
    const wrapper = shallow(<Fixture />);

    expect(wrapper.find('#checked')).toBeChecked();
  });

  it('adds toBeDisabled', () => {
    const Fixture = require.requireActual('./toBeDisabled.fixture');
    const wrapper = shallow(<Fixture />);

    expect(wrapper.find('#disabled')).toBeDisabled();
  });

  it('adds toBeEmpty', () => {
    const Fixture = require.requireActual('./toBeEmpty.fixture');
    const wrapper = shallow(<Fixture />);

    expect(wrapper.find('.doesnt-match')).toBeEmpty();
  });

  it('adds toBePresent', () => {
    const Fixture = require.requireActual('./toBePresent.fixture');
    const wrapper = shallow(<Fixture />);

    expect(wrapper.find('span')).toBePresent();
  });

  it('adds toContainReact', () => {
    const { Fixture, User } = require.requireActual('./toContainReact.fixture');
    const wrapper = shallow(<Fixture />);

    expect(wrapper).toContainReact(<User index={1} />);
  });

  it('adds toHaveClassName', () => {
    const Fixture = require.requireActual('./toHaveClassName.fixture');
    const wrapper = shallow(<Fixture />);

    expect(wrapper.find('.foo')).toHaveClassName('foo');
  });

  it('adds toHaveHTML', () => {
    const { Fixture, html } = require.requireActual('./toHaveHTML.fixture');
    const wrapper = shallow(<Fixture />);

    expect(wrapper.find('#child')).toHaveHTML(html);
  });

  it('adds toHaveProp', () => {
    const Fixture = require.requireActual('./toHaveProp.fixture');
    const wrapper = shallow(<Fixture />);

    expect(wrapper.find('User')).toHaveProp('name');
    expect(wrapper.find('User')).toHaveProp('name', 'blaine');
  });

  it('adds toHaveRef', () => {
    class Fixture extends React.Component {
      render() {
        return <div ref="ref" />
      }
    }
    const wrapper = mount(<Fixture/>);

    expect(wrapper).toHaveRef('ref');
  });

  it('adds toHaveState', () => {
    const Fixture = require.requireActual('./toHaveState.fixture');
    const wrapper = shallow(<Fixture />);

    expect(wrapper).toHaveState('foo');
    expect(wrapper).toHaveState('foo', false);
  });

  it('adds toHaveStyle', () => {
    const Fixture = require.requireActual('./toHaveStyle.fixture');
    const wrapper = shallow(<Fixture />);

    expect(wrapper.find('#style1')).toHaveStyle('height', '100%');
    expect(wrapper.find('#style2')).toHaveStyle('flex', 8);
  });

  it('adds toHaveTagName', () => {
    const Fixture = require.requireActual('./toHaveTagName.fixture');
    const wrapper = shallow(<Fixture />);

    expect(wrapper.find('#span')).toHaveTagName('span');
  });

  it('adds toHaveText', () => {
    const Fixture = require.requireActual('./toHaveText.fixture');
    const wrapper = shallow(<Fixture />);

    expect(wrapper.find('#full')).toHaveText('Test');
    expect(wrapper.find('#full')).toHaveText();
  });

  it('adds toHaveValue', () => {
    const Fixture = require.requireActual('./toHaveValue.fixture');
    const wrapper = shallow(<Fixture />);

    expect(wrapper.find('input').first()).toHaveValue('test');
  });

  it('adds toMatchSelector', () => {
    const Fixture = require.requireActual('./toMatchSelector.fixture');
    const wrapper = shallow(<Fixture />);

    expect(wrapper.find('span')).toMatchSelector('span');
    expect(wrapper.find('#child')).toMatchSelector('#child');
    expect(wrapper.find('.foo')).toMatchSelector('.foo');
  });
});
