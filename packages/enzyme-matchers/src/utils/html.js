// @flow

import instance from './instance';
import isShallowWrapper from './isShallowWrapper';
import getConsoleObject from './getConsoleObject';
import type { EnzymeObject } from '../types';

const consoleObject = getConsoleObject();
const noop = () => {};


function mapWrappersHTML(wrapper: EnzymeObject): Array<string> {
  return wrapper.nodes.map(node => {
    const inst = instance(node);
    const type = node.type || inst._tag;

    const error = consoleObject.error;
    consoleObject.error = noop;
    const { children, ...props } = node.props
      ? node.props
      : inst._currentElement.props;
    consoleObject.error = error;

    const transformedProps = Object.keys(props).map(key => `${key}="${props[key]}"`);
    let stringifiedNode = `<${type} ${transformedProps.join(' ')}`;

    if (children) {
      stringifiedNode += `>[..children..]</${node.type}`;
    } else {
      stringifiedNode += '/>';
    }

    return stringifiedNode;
  });
}

export default function printHTMLForWrapper(wrapper: EnzymeObject): string {
  switch (wrapper.nodes.length) {
    case 0: {
      return '[empty set]';
    }
    case 1: {
      if (isShallowWrapper(wrapper)) {
        return wrapper.debug().replace(/\n/g, '');
      }

      return wrapper.html();
    }
    default: {
      const nodes = mapWrappersHTML(wrapper).reduce(
        (acc, curr, index) => `${acc}${index}: ${curr}\n`,
        ''
      );

      return `Multiple nodes found:\n${nodes}`;
    }
  }
}
