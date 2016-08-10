const { shallow, mount } = require('enzyme');
const React = require('react');

const {
  compare: toHaveStyle,
  negativeCompare: notToHaveStyle,
} = require('../toHaveStyle').toHaveStyle(jasmine.matchersUtil, []);

function Fixture() {
  const style1 = { height: '100%' };
  const style2 = { flex: 8 };

  return (
    <div>
      <span id="style1" style={style1} />
      <span id="style2" style={style2} />
    </div>
  );
}

describe('toHaveStyle', () => {
  describe('integration', () => {
    it('works with `shallow` renders', () => {
      const wrapper = shallow(<Fixture />);
      expect(wrapper.find('#style1')).toHaveStyle('height', '100%');
      expect(wrapper.find('#style2')).toHaveStyle('flex', 8);
    });

    it('works with `mount` renders', () => {
      const wrapper = mount(<Fixture />);
      expect(wrapper.find('#style1')).toHaveStyle('height', '100%');
      expect(wrapper.find('#style2')).toHaveStyle('flex', 8);
    });
  });

  describe('unit-tests', () => {
    describe('toHaveStyle', () => {
      const wrapper = mount(<Fixture />).find('#style1');
      const truthyResults = toHaveStyle(wrapper, 'height', '100%');
      const falsyResults = toHaveStyle(wrapper, 'height', '0');

      it('passes when true', () => {
        expect(truthyResults.pass).toBeTruthy();
        expect(falsyResults.pass).toBeFalsy();
      });

      it('\'s message is non-negative', () => {
        expect(truthyResults.message).not.toContain('not');
      });
    });

    describe('notToHaveStyle', () => {
      const wrapper = mount(<Fixture />).find('#style1');
      const falsyResults = notToHaveStyle(wrapper, 'height', '100%');
      const truthyResults = notToHaveStyle(wrapper, 'height', '0');

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
