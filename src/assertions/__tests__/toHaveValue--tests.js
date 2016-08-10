const { shallow, mount } = require('enzyme');
const React = require('react');

const {
  compare: toHaveValue,
  negativeCompare: notToHaveValue,
} = require('../toHaveValue').toHaveValue(jasmine.matchersUtil, []);

function Fixture() {
  return (
    <div>
      <input defaultValue="test" />
      <input defaultValue="foo" value="bar" onChange={jest.genMockFunction()} />
    </div>
  );
}

describe('toHaveValue', () => {
  describe('integration', () => {
    it('works with `shallow` renders', () => {
      const wrapper = shallow(<Fixture />);
      expect(wrapper.find('input').first()).toHaveValue('test');
    });

    it('works with `mount` renders', () => {
      const wrapper = mount(<Fixture />);
      expect(wrapper.find('input').first()).toHaveValue('test');
    });

    it('prioritizes `value', () => {
      const wrapper = shallow(<Fixture />);
      expect(wrapper.find('input').at(1)).toHaveValue('bar');
      expect(wrapper.find('input').at(1)).not.toHaveValue('foo');
    });

    it('works with with jasmines negation', () => {
      const wrapper = shallow(<Fixture />);
      expect(wrapper.find('input').first()).not.toHaveValue('foo');
    });
  });

  describe('unit-tests', () => {
    describe('toHaveValue', () => {
      const wrapper = mount(<Fixture />).find('input').first();
      const truthyResults = toHaveValue(wrapper, 'test');
      const falsyResults = toHaveValue(wrapper, 'Turdz');

      it('passes when true', () => {
        expect(truthyResults.pass).toBeTruthy();
        expect(falsyResults.pass).toBeFalsy();
      });

      it('\'s message is non-negative', () => {
        expect(truthyResults.message).not.toContain('not');
      });
    });

    describe('notToHaveValue', () => {
      const wrapper = mount(<Fixture />).find('input').first();
      const falsyResults = notToHaveValue(wrapper, 'test');
      const truthyResults = notToHaveValue(wrapper, 'Turdz');

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
