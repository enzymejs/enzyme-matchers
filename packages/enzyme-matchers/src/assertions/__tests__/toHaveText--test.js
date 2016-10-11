const { shallow, mount } = require('enzyme');
const React = require('react');

const {
  compare: toHaveText,
  negativeCompare: notToHaveText,
} = require('../toHaveText').toHaveText(jasmine.matchersUtil, []);

function Fixture() {
  return (
    <div>
      <p id="full">Test</p>
      <p id="empty"></p>
    </div>
  );
}

describe('toHaveText', () => {
  describe('integration', () => {
    it('works with `shallow` renders', () => {
      const wrapper = shallow(<Fixture />);
      expect(wrapper.find('#full')).toHaveText('Test');
      expect(wrapper.find('#full')).toHaveText();
    });

    it('works with `mount` renders', () => {
      const wrapper = mount(<Fixture />);
      expect(wrapper.find('#full')).toHaveText('Test');
      expect(wrapper.find('#full')).toHaveText();
    });

    it('works with with jasmines negation', () => {
      const wrapper = shallow(<Fixture />);
      expect(wrapper.find('#full')).not.toHaveText('Wrong');
      expect(wrapper.find('#empty')).not.toHaveText();
    });
  });

  describe('unit-tests', () => {
    describe('toHaveText', () => {
      const wrapper = mount(<Fixture />).find('#full');
      const truthyResults = toHaveText(wrapper, 'Test');
      const falsyResults = toHaveText(wrapper, 'Turdz');

      it('passes when true', () => {
        expect(truthyResults.pass).toBeTruthy();
        expect(falsyResults.pass).toBeFalsy();
      });

      it('\'s message is non-negative', () => {
        expect(truthyResults.message).not.toContain('not');
      });
    });

    describe('notToHaveText', () => {
      const wrapper = mount(<Fixture />).find('#full');
      const falsyResults = notToHaveText(wrapper, 'Test');
      const truthyResults = notToHaveText(wrapper, 'Turdz');

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
