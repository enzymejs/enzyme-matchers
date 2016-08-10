const { shallow, mount } = require('enzyme');
const React = require('react');

const {
  compare: toHaveTagName,
  negativeCompare: notToHaveTagName,
} = require('../toHaveTagName').toHaveTagName(jasmine.matchersUtil, []);

function Fixture() {
  return (
    <div>
      <span id="span" />
      <span />
      <a id="a" />
    </div>
  );
}

describe('toHaveTagName', () => {
  describe('integration', () => {
    it('works with `shallow` renders', () => {
      const wrapper = shallow(<Fixture />);
      expect(wrapper.find('#span')).toHaveTagName('span');
    });

    it('works with `mount` renders', () => {
      const wrapper = mount(<Fixture />);
      expect(wrapper.find('#span')).toHaveTagName('span');
    });

    it('works with with jasmines negation', () => {
      const wrapper = shallow(<Fixture />);
      expect(wrapper.find('#a')).not.toHaveTagName('span');
    });

    it('gives a specific error when trying to find for multiple nodes', () => {
      const wrapper = shallow(<Fixture />);

      const result = toHaveTagName(wrapper.find('span'), 'span');

      expect(result.pass).toBeFalsy();
      expect(result.message).toBe(
        'Cannot verify tag name on a wrapper of multiple nodes. Found 2 nodes.'
      );
    });
  });

  describe('unit-tests', () => {
    describe('toHaveTagName', () => {
      const wrapper = mount(<Fixture />).find('a');
      const truthyResults = toHaveTagName(wrapper, 'a');
      const falsyResults = toHaveTagName(wrapper, 'span');

      it('passes when true', () => {
        expect(truthyResults.pass).toBeTruthy();
        expect(falsyResults.pass).toBeFalsy();
      });

      it('\'s message is non-negative', () => {
        expect(truthyResults.message).not.toContain('not');
      });
    });

    describe('notToHaveTagName', () => {
      const wrapper = mount(<Fixture />).find('a');
      const falsyResults = notToHaveTagName(wrapper, 'a');
      const truthyResults = notToHaveTagName(wrapper, 'span');

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
