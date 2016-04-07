const { shallow, mount } = require('enzyme');
const React = require('react');

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
        <li><User index={1}/></li>
        <li><User index={2}/></li>
      </ul>
    </div>
  );
}

describe('toContain', () => {
  it('works with `shallow` renders', () => {
    const wrapper = shallow(<Fixture />);
    expect(wrapper).toContain(<User index={1} />);
  });

  it('works with `mount` renders', () => {
    const wrapper = mount(<Fixture />);
    expect(wrapper).toContain(<User index={1} />);
  });

  it('works with with jasmines negation', () => {
    const wrapper = shallow(<Fixture />);
    expect(wrapper).not.toContain(<User index={3} />);
  });
});
