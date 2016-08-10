const { shallow, mount } = require('enzyme');
const React = require('react');

const {
  compare: toBeDisabled,
  negativeCompare: notToBeDisabled,
} = require('../toBeDisabled').toBeDisabled();

function Fixture() {
  return (
    <div>
      <input id="disabled" disabled />
      <input id="not" />
    </div>
  );
}

describe('toBeDisabled', () => {
  describe('integration', () => {
    it('works with `shallow` renders', () => {
      const wrapper = shallow(<Fixture />);
      expect(wrapper.find('#disabled')).toBeDisabled();
    });

    it('works with `mount` renders', () => {
      const wrapper = mount(<Fixture />);
      expect(wrapper.find('#disabled')).toBeDisabled();
    });

    it('works with with jasmines negation', () => {
      const wrapper = shallow(<Fixture />);
      expect(wrapper.find('#not')).not.toBeDisabled();
    });
  });

  describe('unit-tests', () => {
    describe('toBeDisabled', () => {
      const wrapper = shallow(<Fixture />);
      const truthyResults = toBeDisabled(wrapper.find('#disabled'));
      const falsyResults = toBeDisabled(wrapper.find('#not'));

      it('passes when true', () => {
        expect(truthyResults.pass).toBeTruthy();
        expect(falsyResults.pass).toBeFalsy();
      });

      it('\'s message is non-negative', () => {
        expect(truthyResults.message).not.toContain('not');
      });
    });

    describe('notToBeDisabled', () => {
      const wrapper = shallow(<Fixture />);
      const falsyResults = notToBeDisabled(wrapper.find('#disabled'));
      const truthyResults = notToBeDisabled(wrapper.find('#not'));

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
