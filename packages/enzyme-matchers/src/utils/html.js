import instance from './instance';
/* eslint-disable no-console */
const noop = () => {};
const error = console.error;

function mapWrappersHTML(wrapper) : string {
  return wrapper.nodes.map(node => {
    const inst = instance(node);
    const type = node.type || inst._tag;

    console.error = noop;
    const { children, ...props } = node.props
      ? node.props
      : inst._currentElement.props;
    console.error = error;

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

export default function printHTMLForWrapper(wrapper) : string {
  switch (wrapper.nodes.length) {
    case 0: {
      return '[empty set]';
    }
    case 1: {
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
