const { shallow, mount } = require('enzyme');
const React = require('react');

const {
  compare: toHaveRef,
  negativeCompare: notToHaveRef,
} = require('../toHaveRef').toHaveRef(jasmine.matchersUtil, []);

class Fixture extends React.Component {
  render() {
    return (
      <div>
        <span ref="child" />
      </div>
    );
  }
}

describe('toHaveRef', () => {
  describe('integration', () => {
    it('fails with `shallow` renders', () => {
      const wrapper = shallow(<Fixture />);

      const results = toHaveRef(wrapper, 'child');

      expect(results.pass).toBeFalsy();
    });

    it('works with `mount` renders', () => {
      const wrapper = mount(<Fixture />);
      expect(wrapper).toHaveRef('child');
    });

    it('works with with jasmines negation', () => {
      const wrapper = mount(<Fixture />);
      expect(wrapper).not.toHaveRef('foo');
    });
  });

  describe('unit-tests', () => {
    describe('toHaveRef', () => {
      const wrapper = mount(<Fixture />);
      const truthyResults = toHaveRef(wrapper, 'child');
      const falsyResults = toHaveRef(wrapper, 'dad');

      it('passes when true', () => {
        expect(truthyResults.pass).toBeTruthy();
        expect(falsyResults.pass).toBeFalsy();
      });

      it('\'s message is non-negative', () => {
        expect(truthyResults.message).not.toContain('not');
      });
    });

    describe('notToHaveRef', () => {
      const wrapper = mount(<Fixture />);
      const falsyResults = notToHaveRef(wrapper, 'child');
      const truthyResults = notToHaveRef(wrapper, 'dad');

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
