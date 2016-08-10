const { shallow, mount } = require('enzyme');
const React = require('react');

const {
  compare: toBeEmpty,
  negativeCompare: notToBeEmpty,
} = require('../toBeEmpty').toBeEmpty();

function Fixture() {
  return (
    <div>
      <span className="matches" />
    </div>
  );
}

describe('toBeEmpty', () => {
  describe('integration', () => {
    it('works with `shallow` renders', () => {
      const wrapper = shallow(<Fixture />);
      expect(wrapper.find('.doesnt-match')).toBeEmpty();
    });

    it('works with `mount` renders', () => {
      const wrapper = mount(<Fixture />);
      expect(wrapper.find('.doesnt-match')).toBeEmpty();
    });

    it('works with with jasmines negation', () => {
      const wrapper = shallow(<Fixture />);
      expect(wrapper.find('.matches')).not.toBeEmpty();
    });
  });

  describe('unit-tests', () => {
    describe('toBeEmpty', () => {
      const wrapper = shallow(<Fixture />);
      const truthyResults = toBeEmpty(wrapper.find('.doesnt-match'));
      const falsyResults = toBeEmpty(wrapper.find('.matches'));

      it('passes when true', () => {
        expect(truthyResults.pass).toBeTruthy();
        expect(falsyResults.pass).toBeFalsy();
      });

      it('\'s message is non-negative', () => {
        expect(truthyResults.message).not.toContain('not');
      });
    });

    describe('notToBeEmpty', () => {
      const wrapper = shallow(<Fixture />);
      const falsyResults = notToBeEmpty(wrapper.find('.doesnt-match'));
      const truthyResults = notToBeEmpty(wrapper.find('.matches'));

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
