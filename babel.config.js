const presets = [
  [
    '@babel/preset-env',
    {
      targets: {
        node: 'current',
      },
    },
  ],
  '@babel/preset-react',
  '@babel/preset-flow',
];

const plugins = [
  'add-module-exports',
];

module.exports = {
  presets,
  plugins,
};
