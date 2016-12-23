import React from 'react';
import { shallow } from 'enzyme';
import { findDOMNode } from 'enzyme/build/react-compat';

const noop = () => {};
const error = console.error;

function mapWrappersHTML(wrapper) : string {
  return wrapper.nodes.map(node => {
    const type = node.type || node._reactInternalComponent._tag;

    console.error = noop;
    const { children, ...props } = node.props
      ? node.props
      : node._reactInternalComponent._currentElement.props;
    console.error = error;

    const transformedProps = Object.keys(props).map(key => `${key}="${props[key]}"`);
    let stringifiedNode = `<${type} ${transformedProps.join(' ')}`;

    if (children) {
      stringifiedNode += `>[..children..]</${node.type}`;
    } else {
      stringifiedNode += '/>';
    }

    return stringifiedNode;
  })
}

export default function printHTMLForWrapper(wrapper) : string {
  switch (wrapper.nodes.length) {
  case 0:
    return '[empty set]';
  case 1:
    return wrapper.html();
  default:
    return 'Multiple nodes found:\n' + mapWrappersHTML(wrapper).reduce((acc, curr, index) => {
      return acc + `${index}: ${curr}\n`
    }, '');
  }
}
