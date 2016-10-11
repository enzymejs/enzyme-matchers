const { shallow, mount } = require('enzyme');
const React = require('react');

const {
  compare: toContainReact,
  negativeCompare: notToContainReact,
} = require('../toContainReact').toContainReact();

function User(props) {
  return (
    <span>User {props.index}</span>
  );
}

User.propTypes = {
  index: React.PropTypes.number.isRequired,
};

function Fixture() {
  return (
    <div>
      <ul>
        <li><User index={1} /></li>
        <li><User index={2} /></li>
      </ul>
    </div>
  );
}

describe('toContainReact', () => {
  describe('integration', () => {
    it('works with `shallow` renders', () => {
      const wrapper = shallow(<Fixture />);
      expect(wrapper).toContainReact(<User index={1} />);
    });

    it('works with `mount` renders', () => {
      const wrapper = mount(<Fixture />);
      expect(wrapper).toContainReact(<User index={1} />);
    });

    it('works with with jasmines negation', () => {
      const wrapper = shallow(<Fixture />);
      expect(wrapper).not.toContainReact(<User index={3} />);
    });
  });

  describe('unit-tests', () => {
    describe('toContainReact', () => {
      const wrapper = shallow(<Fixture />);
      const truthyResults = toContainReact(wrapper, <User index={1} />);
      const falsyResults = toContainReact(wrapper, <User index={3} />);

      it('passes when true', () => {
        expect(truthyResults.pass).toBeTruthy();
        expect(falsyResults.pass).toBeFalsy();
      });

      it('\'s message is non-negative', () => {
        expect(truthyResults.message).not.toContain('not');
      });
    });

    describe('notToContainReact', () => {
      const wrapper = shallow(<Fixture />);
      const falsyResults = notToContainReact(wrapper, <User index={1} />);
      const truthyResults = notToContainReact(wrapper, <User index={3} />);

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
