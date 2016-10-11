const { shallow, mount } = require('enzyme');
const React = require('react');

const {
  compare: toHaveHTML,
  negativeCompare: notToHaveHTML,
} = require('../toHaveHTML').toHaveHTML();

function Fixture() {
  return (
    <div id="root">
      <span id="child">Test</span>
    </div>
  );
}

const html = '<span id="child">Test</span>';

describe('toHaveHTML', () => {
  describe('integration', () => {
    it('works with `shallow` renders', () => {
      const wrapper = shallow(<Fixture />);
      expect(wrapper.find('#child')).toHaveHTML(html);
    });

    it('works with `mount` renders', () => {
      const wrapper = mount(<Fixture />);
      expect(wrapper.find('#child')).toHaveHTML(html);
    });

    it('normalizes the quotations used', () => {
      const wrapper = shallow(<Fixture />);
      expect(wrapper.find('#child')).toHaveHTML(html);

      expect(wrapper.find('#child')).toHaveHTML(
        '<span id=\'child\'>Test</span>'
      );
    });

    it('works with with jasmines negation', () => {
      const wrapper = shallow(<Fixture />);
      expect(wrapper.find('#child')).not.toHaveHTML('foo');
    });
  });

  describe('unit-tests', () => {
    describe('toHaveHTML', () => {
      const wrapper = shallow(<Fixture />);
      const truthyResults = toHaveHTML(wrapper.find('#child'), html);
      const falsyResults = toHaveHTML(wrapper.find('#child'), 'foo');

      it('passes when true', () => {
        expect(truthyResults.pass).toBeTruthy();
        expect(falsyResults.pass).toBeFalsy();
      });

      it('\'s message is non-negative', () => {
        expect(truthyResults.message).not.toContain('not');
      });
    });

    describe('notToHaveHTML', () => {
      const wrapper = shallow(<Fixture />);
      const falsyResults = notToHaveHTML(wrapper.find('#child'), html);
      const truthyResults = notToHaveHTML(wrapper.find('#child'), 'foo');

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
