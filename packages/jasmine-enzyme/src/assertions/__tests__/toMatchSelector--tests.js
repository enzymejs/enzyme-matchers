const { shallow, mount } = require('enzyme');
const React = require('react');

const {
  compare: toMatchSelector,
  negativeCompare: notToMatchSelector,
} = require('../toMatchSelector').toMatchSelector(jasmine.matchersUtil, []);

function Fixture() {
  return (
    <div>
      <span id="child" className="foo" />
    </div>
  );
}

describe('toMatchSelector', () => {
  describe('integration', () => {
    it('works with `shallow` renders', () => {
      const wrapper = shallow(<Fixture />);

      expect(wrapper.find('#child')).toMatchSelector('span');
      expect(wrapper.find('#child')).toMatchSelector('#child');
      expect(wrapper.find('#child')).toMatchSelector('.foo');
    });

    it('works with `mount` renders', () => {
      const wrapper = mount(<Fixture />);

      expect(wrapper.find('#child')).toMatchSelector('span');
      expect(wrapper.find('#child')).toMatchSelector('#child');
      expect(wrapper.find('#child')).toMatchSelector('.foo');
    });

    it('works with with jasmines negation', () => {
      const wrapper = shallow(<Fixture />);
      expect(wrapper.find('#child')).not.toMatchSelector('ball');
    });
  });

  describe('unit-tests', () => {
    describe('toMatchSelector', () => {
      const wrapper = mount(<Fixture />).find('#child');
      const truthyResults = toMatchSelector(wrapper, '#child');
      const falsyResults = toMatchSelector(wrapper, '.doesnt-match');

      it('passes when true', () => {
        expect(truthyResults.pass).toBeTruthy();
        expect(falsyResults.pass).toBeFalsy();
      });

      it('\'s message is non-negative', () => {
        expect(truthyResults.message).not.toContain('not');
      });
    });

    describe('notToMatchSelector', () => {
      const wrapper = mount(<Fixture />).find('#child');
      const falsyResults = notToMatchSelector(wrapper, '#child');
      const truthyResults = notToMatchSelector(wrapper, '.doesnt-match');

      it('passes when false', () => {
        expect(falsyResults.pass).toBeFalsy();
        expect(truthyResults.pass).toBeTruthy();
      });

      it('\'s message is negative', () => {
        expect(truthyResults.message).toContain('not');
      });
    });
  });
});
