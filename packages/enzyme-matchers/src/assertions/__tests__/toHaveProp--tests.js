const { shallow } = require('enzyme');
const React = require('react');

const toHaveProp = require('../toHaveProp');

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

const fn = () => {};

function Fixture() {
  return (
    <div>
      <User
        name="blaine"
        email="blainekasten@gmail.com"
        arrayProp={[1, 2, 3]}
        objectProp={{ foo: 'bar' }}
        fn={fn}
        falsy={false}
      />
    </div>
  );
}

describe('toHaveProp', () => {
  it('can validate arrays', () => {
    const wrapper = shallow(<Fixture />);
    const user = wrapper.find(User);
    const truthy = toHaveProp(user, 'arrayProp', [1, 2, 3]);
    const falsy = toHaveProp(user, 'arrayProp', [4, 5, 6]);

    expect(truthy.pass).toBeTruthy();
    expect(falsy.pass).toBeFalsy();
  });

  it('can validate objects', () => {
    const wrapper = shallow(<Fixture />);
    const user = wrapper.find(User);
    const truthy = toHaveProp(user, 'objectProp', { foo: 'bar' });
    const falsy = toHaveProp(user, 'objectProp', { foo: 'BOO' });

    expect(truthy.pass).toBeTruthy();
    expect(falsy.pass).toBeFalsy();
  });

  it('works with falsy props', () => {
    const wrapper = shallow(<Fixture />);
    const { pass } = toHaveProp(wrapper.find(User), 'falsy', false);

    expect(pass).toBeTruthy();
  });

  it('works with functions', () => {
    const wrapper = shallow(<Fixture />);
    const { pass } = toHaveProp(wrapper.find(User), 'fn', fn);
    const { pass: fail } = toHaveProp(wrapper.find(User), 'fn', () => {});

    expect(pass).toBeTruthy();
    expect(fail).toBeFalsy();
  });

  it('returns the pass flag properly', () => {
    const wrapper = shallow(<Fixture />);
    const truthyResults = toHaveProp(wrapper.find(User), 'name', 'blaine');
    const falsyResults = toHaveProp(wrapper.find(User), 'name', 'jon');

    expect(truthyResults.pass).toBeTruthy();
    expect(falsyResults.pass).toBeFalsy();
  });

  it('returns the message with the proper pass/fail verbage', () => {
    const wrapper = shallow(<Fixture />);
    const truthyResults = toHaveProp(wrapper.find(User), 'name', 'blaine');
    const falsyResults = toHaveProp(wrapper.find(User), 'name', 'jon');

    expect(truthyResults.message).not.toContain('not');
    expect(falsyResults.message).toContain('not');
  });
});
