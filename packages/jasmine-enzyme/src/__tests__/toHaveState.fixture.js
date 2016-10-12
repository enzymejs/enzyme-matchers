const React = require('react');

export default class Fixture extends React.Component {
  constructor() {
    super();
    this.state = {
      foo: false,
      array: [1, 2, 3],
      object: { foo: 'bar' },
    };
  }

  render() {
    return (
      <div />
    );
  }
}
