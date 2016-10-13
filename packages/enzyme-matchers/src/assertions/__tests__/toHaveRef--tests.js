const { mount } = require('enzyme');
const React = require('react');

const toHaveRef = require('../toHaveRef');

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
  const wrapper = mount(<Fixture />);
  const truthyResults = toHaveRef(wrapper, 'child');
  const falsyResults = toHaveRef(wrapper, 'dad');

  it('returns the pass flag properly', () => {
    expect(truthyResults.pass).toBeTruthy();
    expect(falsyResults.pass).toBeFalsy();
  });

  it('returns the message with the proper pass/fail verbage', () => {
    expect(truthyResults.message).not.toContain('not');
    expect(falsyResults.message).toContain('not');
  });
});
