const { shallow, mount } = require('enzyme');
const React = require('react');

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
