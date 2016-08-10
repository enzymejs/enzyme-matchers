const { shallow, mount } = require('enzyme');
const React = require('react');

const {
  compare: toBeChecked,
  negativeCompare: notToBeChecked,
} = require('../toBeChecked').toBeChecked();


function Fixture() {
  return (
    <div>
      <input id="checked" defaultChecked />
      <input id="not" defaultChecked={false} />
      <input id="tertiary" defaultChecked checked={false} />
    </div>
  );
}

describe('toBeChecked', () => {
  describe('integration', () => {
    it('works with `shallow` renders', () => {
      const wrapper = shallow(<Fixture />);
      expect(wrapper.find('#checked')).toBeChecked();
    });

    it('works with `mount` renders', () => {
      const wrapper = mount(<Fixture />);
      expect(wrapper.find('#checked')).toBeChecked();
    });

    it('works with with jasmines negation', () => {
      const wrapper = shallow(<Fixture />);
      expect(wrapper.find('#not')).not.toBeChecked();
    });

    it('can be defaultChecked, currently not checked, and know to say its not checked', () => {
      const wrapper = shallow(<Fixture />);
      expect(wrapper.find('#tertiary')).not.toBeChecked();
    });
  });

  describe('unit-tests', () => {
    describe('toBeChecked', () => {
      const wrapper = shallow(<Fixture />);
      const truthyResults = toBeChecked(wrapper.find('#checked'));
      const falsyResults = toBeChecked(wrapper.find('#not'));

      it('passes when true', () => {
        expect(truthyResults.pass).toBeTruthy();
        expect(falsyResults.pass).toBeFalsy();
      });

      it('\'s message is non-negative', () => {
        expect(truthyResults.message).not.toContain('not');
      });
    });

    describe('notToBeChecked', () => {
      const wrapper = shallow(<Fixture />);
      const falsyResults = notToBeChecked(wrapper.find('#checked'));
      const truthyResults = notToBeChecked(wrapper.find('#not'));

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
