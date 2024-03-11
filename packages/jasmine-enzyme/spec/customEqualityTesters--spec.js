/* eslint-disable global-require */
'use strict'; // eslint-disable-line

const { shallow } = require('enzyme');
const React = require('react');
const jasmineEnzyme = require('../lib/index.js');

describe('Support for Jasmine custom equality testers', () => {
  function createMatcherFactory() {
    spyOn(jasmine, 'addMatchers');
    jasmineEnzyme();
    const addMatchersArgs = jasmine.addMatchers.calls
      .allArgs()
      .filter(args => args[0].toHaveState)[0];
    return addMatchersArgs[0].toHaveState;
  }

  it('works with Jasmine <3.6', () => {
    const matcherFactory = createMatcherFactory();
    const Fixture = require('./fixtures/toHaveState.fixture');
    const wrapper = shallow(React.createElement(Fixture));
    const util = {
      equals: (a, b, testers) => testers[0](a, b),
    };
    const customEqualityTesters = [(a, b) => a.toString() === b.toString()];
    const matcher = matcherFactory(util, customEqualityTesters);

    const result = matcher.compare(wrapper, 'foo', 'false');
    expect(result.pass).toEqual(true);
  });

  it('works with Jasmine >= 3.6 without triggering deprecation warnings', () => {
    const matcherFactory = createMatcherFactory();
    const Fixture = require('./fixtures/toHaveState.fixture');
    const wrapper = shallow(React.createElement(Fixture));
    const customEqualityTesters = [(a, b) => a.toString() === b.toString()];
    customEqualityTesters.deprecated = true;
    const util = jasmine.createSpyObj('matchersUtil', ['equals']);
    util.equals.and.callFake((a, b) => customEqualityTesters[0](a, b));
    const matcher = matcherFactory(util, customEqualityTesters);

    const result = matcher.compare(wrapper, 'foo', 'false');
    expect(result.pass).toEqual(true);
    expect(util.equals).toHaveBeenCalled();

    // Make sure we don't trigger any deprecation warnings
    expect(matcherFactory.length).toBeLessThan(2);
    expect(util.equals).not.toHaveBeenCalledWith(
      jasmine.anything(),
      jasmine.anything(),
      customEqualityTesters
    );
  });

  it('works if Jasmine does not pass customEqualityTesters', () => {
    const matcherFactory = createMatcherFactory();
    const Fixture = require('./fixtures/toHaveState.fixture');
    const wrapper = shallow(React.createElement(Fixture));
    const util = {
      equals: () => true,
    };
    const matcher = matcherFactory(util);

    const result = matcher.compare(wrapper, 'foo', 'false');
    expect(result.pass).toEqual(true);
  });
});
