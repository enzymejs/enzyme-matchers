const { shallow, mount } = require('enzyme');
const React = require('react');

describe('jest-matchers', () => {
  [shallow, mount].forEach(builder => {
    describe(builder.name, () => {
      it('toBeChecked', () => {
        const Fixture = (props) => <input defaultChecked={props.defaultChecked} />;

        expect(
          builder(<Fixture />).find('input')
        ).not.toBeChecked();

        expect(
          builder(<Fixture defaultChecked />).find('input')
        ).toBeChecked();
      });

      it('toBeDisabled', () => {
        const Fixture = (props) => <input disabled={props.disabled} />;

        expect(
          builder(<Fixture />).find('input')
        ).not.toBeDisabled();

        const node = builder(<Fixture disabled />).find('input');

        expect(
          builder(<Fixture />).find('input')
        ).not.toBeDisabled();
      });

      it('toBeEmpty', () => {
        const Fixture = () => (
          <div></div>
        );

        const wrapper = builder(<Fixture />);

        expect(wrapper).not.toBeEmpty();
        expect(wrapper.children()).toBeEmpty();
      });

      it('toBePresent', () => {
        const Fixture = () => (
          <div></div>
        );

        const wrapper = builder(<Fixture />);

        expect(wrapper).toBePresent();
        expect(wrapper.children()).not.toBePresent();
      });

      it('toContainReact', () => {
        const Fixture = () => (
          <div><i /></div>
        );

        const wrapper = builder(<Fixture />);

        expect(wrapper).toContainReact(<i />)
        expect(wrapper).not.toContainReact(<b />)
      });

      fit('toHaveClassName', () => {
        const Fixture = () => (
          <div>
            <span className="foo" />
            <span className="foo bar" />
            <span className="foo bar baz" />
          </div>
        );

        const wrapper = builder(<Fixture />);

        expect(wrapper.find('foo')).toHaveClassName('foo');
      })

      it('toHaveHTML', () => {
        const Fixture = () => (
          <div>
            <i><b /></i>
          </div>
        );

        const wrapper = builder(<Fixture />);

        expect(wrapper).not.toHaveHTML('<div><i></b></i></div>')
      });
    });
  });
})
