const React = require('react');

export function Fixture() {
  return (
    <div id="root">
      <span id="child">Test</span>
    </div>
  );
}

export const html = '<span id="child">Test</span>';
