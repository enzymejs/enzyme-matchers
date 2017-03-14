const React = require('react');
const { mount, shallow } = require('enzyme');

describe('snapshotting', () => {
  [mount, shallow].forEach(builder => {
    it(`serializes enzyme objects (${builder.name})`, () => {
      const wrapper = builder(<div className="foo">Hi</div>);

      expect(wrapper).toMatchSnapshot();
    });
  });
});
