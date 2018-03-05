/* globals window */
/* eslint-disable global-require, no-plusplus */
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// MIT license
export const polyfillRaf = () => {
  if (typeof window === 'undefined') return;

  let lastTime = 0;
  const vendors = ['ms', 'moz', 'webkit', 'o'];
  for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[`${vendors[x]}RequestAnimationFrame`];
    window.cancelAnimationFrame =
      window[`${vendors[x]}CancelAnimationFrame`] ||
      window[`${vendors[x]}CancelRequestAnimationFrame`];
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function requestAnimationFrame(callback) {
      const currTime = new Date().getTime();
      const timeToCall = Math.max(0, 16 - (currTime - lastTime));
      const id = window.setTimeout(() => {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }

  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function cancelAnimationFrame(id) {
      clearTimeout(id);
    };
  }
};

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
