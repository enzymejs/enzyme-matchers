/* eslint-disable global-require */

export const exposeGlobals = () => {
  let Adapter;
  switch (global.enzymeAdapterDescriptor) {
    case 'react13':
      Adapter = require('enzyme-adapter-react-13');
      break;
    case 'react14':
      Adapter = require('enzyme-adapter-react-14');
      break;
    case 'react15':
      Adapter = require('enzyme-adapter-react-15');
      break;
    case 'react15.4':
      Adapter = require('enzyme-adapter-react-15.4');
      break;
    case 'react16':
    default:
      Adapter = require('enzyme-adapter-react-16');
  }

  const { configure, mount, render, shallow } = require('enzyme');
  // Setup Enzyme Adapter
  configure({ adapter: new Adapter() });
  global.shallow = shallow;
  global.mount = mount;
  global.render = render;
  global.React = require('react');
};
