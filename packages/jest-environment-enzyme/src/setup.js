/* eslint-disable global-require */

export const exposeGlobals = () => {
  let dep;
  switch (global.enzymedepDescriptor) {
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
    default:
      dep = 'enzyme-adapter-react-16';
  }

  let Adapter;
  try {
    Adapter = require(dep);
  } catch (e) {
    console.error(
      `
      Requiring the proper enzyme-adapter during jest-enzyme setup failed.
      This most likely happens when your application does not properly list the
      adapter in your devDependencies. Run this line to add the correct adapter:

      > yarn add --dev ${dep}

      or with npm
      
      > npm i --save-dev ${dep}
      `
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
