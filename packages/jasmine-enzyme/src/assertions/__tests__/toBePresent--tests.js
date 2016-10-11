const { shallow, mount } = require('enzyme');
const React = require('react');

const {
  compare: toBePresent,
  negativeCompare: notToBePresent,
} = require('../toBePresent').toBePresent();

function Fixture() {
  return (
    <div>
      <span className="matches" />
    </div>
  );
}

describe('toBePresent', () => {
  describe('integration', () => {
    it('works with `shallow` renders', () => {
      const wrapper = shallow(<Fixture />);
      expect(wrapper.find('span')).toBePresent();
    });

    it('works with `mount` renders', () => {
      const wrapper = mount(<Fixture />);
      expect(wrapper.find('span')).toBePresent();
    });

    it('works with with jasmines negation', () => {
      const wrapper = shallow(<Fixture />);
      expect(wrapper.find('ul')).not.toBePresent();
    });
  });

  describe('unit-tests', () => {
    describe('toBePresent', () => {
      const wrapper = shallow(<Fixture />);
      const truthyResults = toBePresent(wrapper.find('.matches'));
      const falsyResults = toBePresent(wrapper.find('.doesnt-matches'));

      it('passes when true', () => {
        expect(truthyResults.pass).toBeTruthy();
        expect(falsyResults.pass).toBeFalsy();
      });

      it('\'s message is non-negative', () => {
        expect(truthyResults.message).not.toContain('not');
      });
    });

    describe('notToBePresent', () => {
      const wrapper = shallow(<Fixture />);
      const falsyResults = notToBePresent(wrapper.find('.matches'));
      const truthyResults = notToBePresent(wrapper.find('.doesnt-match'));

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
