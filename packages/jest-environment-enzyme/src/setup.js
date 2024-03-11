/* eslint-disable global-require */

// eslint-disable-next-line import/prefer-default-export
export const exposeGlobals = () => {
  let dep;
  switch (global.enzymeAdapterDescriptor) {
    case 'react13':
      dep = 'enzyme-adapter-react-13';
      break;
    case 'react14':
      dep = 'enzyme-adapter-react-14';
      break;
    case 'react15':
      dep = 'enzyme-adapter-react-15';
      break;
    case 'react15.4':
      dep = 'enzyme-adapter-react-15.4';
      break;
    case 'react16':
      dep = 'enzyme-adapter-react-16';
      break;
    case 'react17':
    default:
      dep = '@wojtekmaj/enzyme-adapter-react-17';
  }

  let Adapter;
  try {
    // eslint-disable-next-line import/no-dynamic-require
    Adapter = require(dep);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(
      `
      Requiring the proper enzyme-adapter during jest-enzyme setup failed.
      This most likely happens when your application does not properly list the
      adapter in your devDependencies. Run this line to add the correct adapter:

      > yarn add --dev ${dep}

      or with npm
      
      > npm i --save-dev ${dep}
      `,
      e
    );
    return;
  }

  const { configure, mount, render, shallow } = require('enzyme');
  // Setup Enzyme Adapter
  configure({ adapter: new Adapter() });
  global.shallow = shallow;
  global.mount = mount;
  global.render = render;
  global.React = require('react');
};
