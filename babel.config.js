
const presets = [
  ['env', {
    targets: {
      node: 4,
    },
  }],
  'react',
];

const plugins = [
  'transform-object-rest-spread',
  'add-module-exports',
];

module.exports = {
  presets,
  plugins,
};
