const React = require('react');
const { mount, shallow } = require('enzyme');

// this test ensures that the global `addSnapshotSerializer` works for multiple test files
describe('snapshotting second time', () => {
  [mount, shallow].forEach(builder => {
    it(`serializes enzyme objects (${builder.name})`, () => {
      const wrapper = builder(<div className="foo">Hi</div>);

      expect(wrapper).toMatchSnapshot();
    });
  });
});
