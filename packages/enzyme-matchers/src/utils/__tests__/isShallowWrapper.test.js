import { shallow, mount, render } from 'enzyme';
import isShallowWrapper from '../isShallowWrapper';

const Fixture = () => <div />;

describe('isShallowWrapper', () => {
  it('is true for shallow components', () => {
    const wrapper = shallow(<Fixture />);

    expect(isShallowWrapper(wrapper)).toBeTruthy();
  });

  it('is false for mounted components', () => {
    const wrapper = mount(<Fixture />);

    expect(isShallowWrapper(wrapper)).toBeFalsy();
  });

  it('is false for rendered components', () => {
    const wrapper = render(<Fixture />);

    expect(isShallowWrapper(wrapper)).toBeFalsy();
  });
});
