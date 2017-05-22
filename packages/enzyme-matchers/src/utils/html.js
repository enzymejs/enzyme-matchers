import instance from './instance';
/* eslint-disable no-console */
let consoleObject;
try {
  consoleObject = console;
} catch (e) {
  // If no global console object is available, set consoleObject to a dummy object.
  consoleObject = {};
}
const noop = () => {};
const error = consoleObject.error;
const SHALLOW_WRAPPER_CONSTRUCTOR = 'ShallowWrapper';

function isShallowWrapper(wrapper) : boolean {
  let isShallow;
  if (wrapper.constructor.name !== undefined) {
    isShallow = wrapper.constructor.name === SHALLOW_WRAPPER_CONSTRUCTOR;
  } else {
    // function.name isn't available on IE 11, so fall back to turning the function into
    // a string and checking its name this way.
    isShallow = !!(`${wrapper.constructor}`).match(/^function ShallowWrapper\(/);
  }
  return isShallow;
}

function mapWrappersHTML(wrapper) : string {
  return wrapper.nodes.map(node => {
    const inst = instance(node);
    const type = node.type || inst._tag;

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

export default function printHTMLForWrapper(wrapper) : string {
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
