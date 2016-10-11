const { shallow, mount } = require('enzyme');
const React = require('react');

const {
  compare: toHaveClassName,
  negativeCompare: notToHaveClassName,
} = require('../toHaveClassName').toHaveClassName();

function Fixture() {
  return (
    <div>
      <span className="foo" />
      <span className="bar baz" />
    </div>
  );
}

describe('toHaveClassName', () => {
  describe('integration', () => {
    it('works with `shallow` renders', () => {
      const wrapper = shallow(<Fixture />);
      expect(wrapper.find('.foo')).toHaveClassName('foo');
    });

    it('works with `mount` renders', () => {
      const wrapper = mount(<Fixture />);
      expect(wrapper.find('.bar')).toHaveClassName('bar baz');
      expect(wrapper.find('.bar')).toHaveClassName('bar');
      expect(wrapper.find('.bar')).toHaveClassName('baz');
    });

    it('works with with jasmines negation', () => {
      const wrapper = shallow(<Fixture />);
      expect(wrapper.find('.bar')).not.toHaveClassName('balsdfja');
    });
  });

  describe('unit-tests', () => {
    describe('toHaveClassName', () => {
      const wrapper = shallow(<Fixture />);
      const truthyResults = toHaveClassName(wrapper.find('.bar'), 'bar');
      const falsyResults = toHaveClassName(wrapper.find('.bar'), 'asldfkj');

      it('passes when true', () => {
        expect(truthyResults.pass).toBeTruthy();
        expect(falsyResults.pass).toBeFalsy();
      });

      it('\'s message is non-negative', () => {
        expect(truthyResults.message).not.toContain('not');
      });
    });

    describe('notToHaveClassName', () => {
      const wrapper = shallow(<Fixture />);
      const falsyResults = notToHaveClassName(wrapper.find('.bar'), 'bar');
      const truthyResults = notToHaveClassName(wrapper.find('.bar'), 'asdfl');

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
