const { shallow, mount } = require('enzyme');
const React = require('react');

const {
  compare: toHaveProp,
  negativeCompare: notToHaveProp,
} = require('../toHaveProp').toHaveProp(jasmine.matchersUtil, []);

function User(props) {
  return (
    <div>
      {props.name}
      {props.email}
      {props.arrayProp}
      {props.objectProp.foo}
    </div>
  );
}

User.propTypes = {
  name: React.PropTypes.string,
  email: React.PropTypes.string,
  arrayProp: React.PropTypes.array,
  objectProp: React.PropTypes.object,
  falsy: React.PropTypes.bool,
};

function Fixture() {
  return (
    <div>
      <User
        name="blaine"
        email="blainekasten@gmail.com"
        arrayProp={[1, 2, 3]}
        objectProp={{ foo: 'bar' }}
        falsy={false}
      />
    </div>
  );
}

describe('toHaveProp', () => {
  describe('integration', () => {
    it('works with `shallow` renders', () => {
      const wrapper = shallow(<Fixture />);
      expect(wrapper.find(User)).toHaveProp('name');
    });

    it('works with `mount` renders', () => {
      const wrapper = mount(<Fixture />);
      expect(wrapper.find(User)).toHaveProp('name');
    });

    it('can validate the value also', () => {
      const wrapper = shallow(<Fixture />);
      expect(wrapper.find(User)).toHaveProp('name', 'blaine');
    });

    it('works with with jasmines negation', () => {
      const wrapper = shallow(<Fixture />);
      expect(wrapper.find(User)).not.toHaveProp('name', 'blaine kasten');
      expect(wrapper.find(User)).not.toHaveProp('foo');
    });

    it('can validate arrays', () => {
      const wrapper = shallow(<Fixture />);

      expect(wrapper.find(User)).toHaveProp('arrayProp', [1, 2, 3]);
      expect(wrapper.find(User)).not.toHaveProp('arrayProp', [4, 5, 6]);
    });

    it('can validate objects', () => {
      const wrapper = shallow(<Fixture />);

      expect(wrapper.find(User)).toHaveProp('objectProp', { foo: 'bar' });
      expect(wrapper.find(User)).not.toHaveProp('objectProp', { foo: 'baz' });
    });

    it('works with falsy props', () => {
      const wrapper = shallow(<Fixture />);

      expect(wrapper.find(User)).toHaveProp('falsy', false);
    });
  });

  describe('unit-tests', () => {
    describe('toHaveProp', () => {
      const wrapper = shallow(<Fixture />);
      const truthyResults = toHaveProp(wrapper.find(User), 'name', 'blaine');
      const falsyResults = toHaveProp(wrapper.find(User), 'name', 'jon');

      it('passes when true', () => {
        expect(truthyResults.pass).toBeTruthy();
        expect(falsyResults.pass).toBeFalsy();
      });

      it('\'s message is non-negative', () => {
        expect(truthyResults.message).not.toContain('not');
      });
    });

    describe('notToHaveProp', () => {
      const wrapper = shallow(<Fixture />);
      const falsyResults = notToHaveProp(wrapper.find(User), 'name', 'blaine');
      const truthyResults = notToHaveProp(wrapper.find(User), 'name', 'jon');

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
