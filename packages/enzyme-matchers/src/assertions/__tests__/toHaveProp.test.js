const PropTypes = require('prop-types');

const toHaveProp = require('../toHaveProp');

function User(props) {
  return (
    <div>
      {props.name}
      {props.email}
      {props.arrayProp}
      {props.objectProp.foo}
      {props.falsy}
    </div>
  );
}

User.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  arrayProp: PropTypes.array,
  objectProp: PropTypes.object,
  falsy: PropTypes.bool,
};

const fn = () => {};

function Fixture() {
  return (
    <User
      name="blaine"
      email="blainekasten@gmail.com"
      arrayProp={[1, 2, 3]}
      objectProp={{ foo: 'bar' }}
      fn={fn}
      falsy={false}
    />
  );
}

describe('toHaveProp', () => {
  [shallow, mount].forEach(builder => {
    describe(builder.name, () => {
      function build() {
        const wrapper = builder(<Fixture />);
        const user = wrapper.find(User);
        const truthyResults = toHaveProp(user, 'arrayProp', [1, 2, 3]);
        const falsyResults = toHaveProp(user, 'arrayProp', [4, 5, 6]);
        const anyValueResults = toHaveProp(wrapper, 'arrayProp');

        return {
          truthyResults,
          falsyResults,
          anyValueResults,
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

      it(`returns the "any value" message with the proper pass verbage (${builder.name})`, () => {
        const { anyValueResults } = build();
        expect(anyValueResults.message).toMatchSnapshot();
      });

      it(`returns the "any value" message with the proper fail verbage (${builder.name})`, () => {
        const { anyValueResults } = build();
        expect(anyValueResults.negatedMessage).toMatchSnapshot();
      });

      it(`provides "any value" contextual information for the message (${builder.name})`, () => {
        const { anyValueResults } = build();
        expect(anyValueResults.contextualInformation).toMatchSnapshot();
      });

      it('can validate arrays', () => {
        const wrapper = builder(<Fixture />);
        const user = wrapper.find(User);
        const truthy = toHaveProp(user, 'arrayProp', [1, 2, 3]);
        const falsy = toHaveProp(user, 'arrayProp', [4, 5, 6]);

        expect(truthy.pass).toBe(true);
        expect(falsy.pass).toBe(false);
      });

      it('can validate objects', () => {
        const wrapper = builder(<Fixture />);
        const user = wrapper.find(User);
        const truthy = toHaveProp(user, 'objectProp', { foo: 'bar' });
        const falsy = toHaveProp(user, 'objectProp', { foo: 'BOO' });

        expect(truthy.pass).toBe(true);
        expect(falsy.pass).toBe(false);
      });

      it('works with falsy props', () => {
        const wrapper = builder(<Fixture />);
        const { pass } = toHaveProp(wrapper.find(User), 'falsy', false);

        expect(pass).toBe(true);
      });

      it('works with functions', () => {
        const wrapper = builder(<Fixture />);
        const { pass } = toHaveProp(wrapper.find(User), 'fn', fn);
        const { pass: fail } = toHaveProp(wrapper.find(User), 'fn', () => {});

        expect(pass).toBe(true);
        expect(fail).toBe(false);
      });

      it('works without a prop value', () => {
        const wrapper = builder(<Fixture />);
        const truthy = toHaveProp(wrapper.find(User), 'name');

        expect(truthy.pass).toBe(true);
      });

      it('works with undefined value', () => {
        const wrapper = builder(<Fixture />);
        const falsy = toHaveProp(wrapper.find(User), 'name', undefined);

        expect(falsy.pass).toBe(false);
      });
    });
  });
});
