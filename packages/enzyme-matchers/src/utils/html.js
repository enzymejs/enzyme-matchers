import React from 'react';
import { shallow } from 'enzyme';
import { findDOMNode } from 'enzyme/build/react-compat';

const noop = () => {};
const error = console.error;

function mapWrappersHTML(wrapper) {
  return wrapper.nodes.map(node => {
    const type = node.type || node._reactInternalComponent._tag;

    console.error = noop;
    const children = node.props
      ? node.props.children
      : node._reactInternalComponent._currentElement.props.children;
    console.error = error;

    let stringifiedNode = `<${type}`;

    if (children) {
      stringifiedNode += `>[..children..]</${node.type}`;
    } else {
      stringifiedNode += '/>';
    }

    return stringifiedNode;
  })
}

export default function printHTMLForWrapper(wrapper) : string {
  if (wrapper.nodes.length === 1) {
    return wrapper.html();
  }

  return 'Multiple nodes found:\n' + mapWrappersHTML(wrapper).reduce((acc, curr, index) => {
    return acc + `${index}: ${curr}\n`
  }, '')
}
