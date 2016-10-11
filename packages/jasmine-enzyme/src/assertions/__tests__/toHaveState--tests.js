const { shallow, mount } = require('enzyme');
const React = require('react');

const {
  compare: toHaveState,
  negativeCompare: notToHaveState,
} = require('../toHaveState').toHaveState(jasmine.matchersUtil, []);

class Fixture extends React.Component {
  constructor() {
    super();
    this.state = {
      foo: false,
      array: [1, 2, 3],
      object: { foo: 'bar' },
    };
  }

  render() {
    return (
      <div />
    );
  }
}

describe('toHaveState', () => {
  describe('integration', () => {
    it('works with `shallow` renders', () => {
      const wrapper = shallow(<Fixture />);
      expect(wrapper).toHaveState('foo');
    });

    it('works with `mount` renders', () => {
      const wrapper = mount(<Fixture />);
      expect(wrapper).toHaveState('foo');
    });

    it('can validate the value also', () => {
      const wrapper = shallow(<Fixture />);
      expect(wrapper).toHaveState('foo', false);
    });

    it('works with with jasmines negation', () => {
      const wrapper = shallow(<Fixture />);

      expect(wrapper).not.toHaveState('foo', true);
    });

    it('can validate arrays', () => {
      const wrapper = shallow(<Fixture />);

      expect(wrapper).toHaveState('array', [1, 2, 3]);
    });

    it('can validate objects', () => {
      const wrapper = shallow(<Fixture />);

      expect(wrapper).toHaveState('object', { foo: 'bar' });
    });
  });

  describe('unit-tests', () => {
    describe('toHaveState', () => {
      const wrapper = mount(<Fixture />);
      const truthyResults = toHaveState(wrapper, 'foo', false);
      const falsyResults = toHaveState(wrapper, 'foo', true);

      it('passes when true', () => {
        expect(truthyResults.pass).toBeTruthy();
        expect(falsyResults.pass).toBeFalsy();
      });

      it('\'s message is non-negative', () => {
        expect(truthyResults.message).not.toContain('not');
      });
    });

    describe('notToHaveState', () => {
      const wrapper = mount(<Fixture />);
      const falsyResults = notToHaveState(wrapper, 'foo', false);
      const truthyResults = notToHaveState(wrapper, 'foo', true);

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
