const { shallow, mount } = require('enzyme');
const React = require('react');

const {
  compare: toBeEmpty,
  negateCompare: notToBeEmpty
} = require('../toBeEmpty').toBeEmpty();

function Fixture() {
  return (
    <div>
      <span className="isEmpty" />
      <span className="hasChildren">
        <a/>
      </span>
    </div>
  );
}

describe('toBeEmpty', () => {
  describe('integration', () => {
    it('works with `shallow` renders', () => {
      const wrapper = shallow(<Fixture />);
      expect(wrapper.find('.isEmpty')).toBeEmpty();
    });

    it('works with `mount` renders', () => {
      const wrapper = mount(<Fixture />);
      expect(wrapper.find('.isEmpty')).toBeEmpty();
    });

    it('works with with jasmines negation', () => {
      const wrapper = shallow(<Fixture />);
      expect(wrapper.find('.hasChildren')).not.toBeEmpty();
    });
  });

  describe('unit-tests', () => {
    describe('toBeEmpty', () => {
      const wrapper = shallow(<Fixture />);
      const truthyResults = toBeEmpty(wrapper.find('.isEmpty'));
      const falsyResults = toBeEmpty(wrapper.find('.hasChildren'));

      it('passes when true', () => {
        expect(truthyResults.pass).toBeTruthy();
        expect(falsyResults.pass).toBeFalsy();
      });

      it('\'s message is non-negative', () => {
        expect(truthyResults.message).not.toContain('not')
      });
    });

    describe('notToBeEmpty', () => {
      const wrapper = shallow(<Fixture />);
      const falsyResults = notToBeEmpty(wrapper.find('.isEmpty'));
      const truthyResults = notToBeEmpty(wrapper.find('.hasChildren'));

      it('passes when false', () => {
        expect(falsyResults.pass).toBeFalsy();
        expect(truthyResults.pass).toBeTruthy();
      });

      it('\'s message is negative', () => {
        expect(truthyResults.message).toContain('not')
      });
    });
  });
});
