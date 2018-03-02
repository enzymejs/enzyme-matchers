const { shallow, mount } = require('enzyme');
const React = require('react');

const toBeEmptyRender = require('../toBeEmptyRender');

function EmptyRenderFixture() {
  return null;
}

function NonEmptyRenderFixture() {
  return (
    <div>
      <EmptyRenderFixture />
    </div>
  );
}

describe('toBeEmptyRender', () => {
  const wrapper = mount(<NonEmptyRenderFixture />);

  const truthyResults = toBeEmptyRender(wrapper.find('EmptyRenderFixture'));

  const falsyResults = toBeEmptyRender(wrapper);

  it('returns the pass flag properly', () => {
    expect(truthyResults.pass).toBeTruthy();
    expect(falsyResults.pass).toBeFalsy();
  });

  it('returns the message with the proper pass verbage', () => {
    expect(truthyResults.message).toMatchSnapshot();
    expect(truthyResults.negatedMessage).toMatchSnapshot();
  });

  it('provides contextual information for the message', () => {
    expect(falsyResults.contextualInformation).toMatchSnapshot();
  });

  it('considers both false and null to be empty renders', () => {
    const NullRenderer = () => null;
    const nullWrapper = shallow(<NullRenderer />);
    expect(toBeEmptyRender(nullWrapper)).toBeTruthy();

    const FalseRenderer = () => false;
    const falseWrapper = shallow(<FalseRenderer />);
    expect(toBeEmptyRender(falseWrapper)).toBeTruthy();
  });
});
