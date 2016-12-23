const React = require('react');
const { shallow, mount } = require('enzyme');
const html = require('../html');

describe('html', () => {
  const inputStrings = {
    shallow: '<input/>',
    mount: '<input>',
  };

  [shallow, mount].forEach(builder => {
    describe(builder.name, () => {
      it(`prints the html for a single node (${builder.name})`, () => {
        expect(html(builder(<input />))).toBe(inputStrings[builder.name]);
      });

      it(`prints the html for multiple nodes (${builder.name})`, () => {
        const Fixture = () => <div><i /><i /></div>;

        expect(html(builder(<Fixture />).find('i'))).toBe(`Multiple nodes found:
0: <i />
1: <i />
`);
      });

      it('prints props with nodes', () => {
        const Fixture = () => <div><i className="foo" /><i disabled /></div>;

        expect(html(builder(<Fixture />).find('i'))).toBe(`Multiple nodes found:
0: <i className="foo"/>
1: <i disabled="true"/>
`);
      });
    });
  });
});
