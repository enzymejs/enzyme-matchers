const toHaveState = require('../toHaveState');

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
    return <div />;
  }
}

describe('toHaveState', () => {
  [shallow, mount].forEach(builder => {
    describe(builder.name, () => {
      function build() {
        const wrapper = builder(<Fixture />);
        const truthyResults = toHaveState(wrapper, 'array', [1, 2, 3]);
        const falsyResults = toHaveState(wrapper, 'array', [4, 5, 6]);

        return {
          truthyResults,
          falsyResults,
        };
      }

      it('returns the pass flag properly', () => {
        const { truthyResults, falsyResults } = build();

        expect(truthyResults.pass).toBe(true);
        expect(falsyResults.pass).toBe(false);
      });

      it(`returns the message with the proper pass verbage (${builder.name})`, () => {
        const { truthyResults } = build();
        expect(truthyResults.message).toMatchSnapshot();
      });

      it(`returns the message with the proper fail verbage (${builder.name})`, () => {
        const { truthyResults } = build();
        expect(truthyResults.negatedMessage).toMatchSnapshot();
      });

      it(`provides contextual information for the message (${builder.name})`, () => {
        const { truthyResults } = build();
        expect(truthyResults.contextualInformation).toMatchSnapshot();
      });

      it('can validate falsy values', () => {
        const wrapper = shallow(<Fixture />);
        const { pass } = toHaveState(wrapper, 'foo', false);
        const { pass: fail } = toHaveState(wrapper, 'foo', true);

        expect(pass).toBe(true);
        expect(fail).toBe(false);
      });

      it('can validate arrays', () => {
        const wrapper = shallow(<Fixture />);
        const { pass } = toHaveState(wrapper, 'array', [1, 2, 3]);
        const { pass: fail } = toHaveState(wrapper, 'array', [4, 5, 6]);

        expect(pass).toBe(true);
        expect(fail).toBe(false);
      });

      it('can validate objects', () => {
        const wrapper = shallow(<Fixture />);
        const { pass } = toHaveState(wrapper, 'object', { foo: 'bar' });
        const { pass: fail } = toHaveState(wrapper, 'object', { foo: 'NOPE' });

        expect(pass).toBe(true);
        expect(fail).toBe(false);
      });

      it('returns the pass flag properly', () => {
        const wrapper = mount(<Fixture />);
        const truthyResults = toHaveState(wrapper, 'foo', false);
        const falsyResults = toHaveState(wrapper, 'foo', true);

        expect(truthyResults.pass).toBe(true);
        expect(falsyResults.pass).toBe(false);
      });

      it('works without a prop value', () => {
        const wrapper = builder(<Fixture />);
        const truthy = toHaveState(wrapper, 'foo');

        expect(truthy.pass).toBe(true);
      });

      it('works with undefined value', () => {
        const wrapper = builder(<Fixture />);
        const falsy = toHaveState(wrapper, 'foo', undefined);

        expect(falsy.pass).toBe(false);
      });

      it('should support object arguments', () => {
        const wrapper = builder(<Fixture />);

        const passResult = toHaveState(wrapper, {
          foo: false,
          array: [1, 2, 3],
        });
        const failResult = toHaveState(wrapper, {
          foo: true,
          array: [1, 2, 3],
        });

        expect(passResult.pass).toBe(true);
        expect(failResult.pass).toBe(false);
      });
    });
  });
});
