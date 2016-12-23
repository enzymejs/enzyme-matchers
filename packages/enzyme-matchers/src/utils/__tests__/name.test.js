const React = require('react');
const name = require('../name');
const { shallow, mount } = require('enzyme');

function getNodeName(builder, comp) {
  return name(builder(comp));
}

describe('getNodeName', () => {
  [shallow, mount].forEach(builder => {
    describe(builder.name, () => {
      it('returns the node name for a single HTML node', () => {
        expect(
          getNodeName(builder, <input />)
        ).toBe('input');
      });

      it('returns the component name for a single functional component', () => {
        const Fixture = function Fixture() { return <div />; };

        expect(
          getNodeName(builder, <Fixture />)
        ).toBe('Fixture');
      });

      it('gives a useful string when given multiple same type nodes', () => {
        const Fixture = () => <div><i /><i /></div>;

        expect(
          name(builder(<Fixture />).find('i'))
        ).toBe('Fixture, 2 i nodes found');
      });

      it('gives a useful string when given multiple mixed nodes', () => {
        const Fixture = () => <div><i className="foo" /><b className="foo" /></div>;

        expect(
          name(builder(<Fixture />).find('.foo'))
        ).toBe('Fixture, 2 mixed nodes found');
      });

      it('gives a useful string for arrays', () => {
        const wrapper = builder(
          <div>
            <i />
            <i />
          </div>
        );

        const arrayOf2 = wrapper.find('i');
        const arrayOfNone = wrapper.find('b');

        expect(name(arrayOfNone)).toBe('[empty set]');
        expect(name(arrayOf2)).toBe('div, 2 i nodes found');
      });
    });
  });

  it('falls back to [empty set] if we can\'t figure out the name', () => {
    const fakeWrapper = { nodes: [] };
    expect(
      name(fakeWrapper)
    ).toBe('[empty set]');
  });
});
