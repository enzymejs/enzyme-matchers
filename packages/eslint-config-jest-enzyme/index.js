module.exports = {
  overrides: [
    {
      files: ['**/*.test.js', '**/*.test.jsx'],
      globals: {
        React: true,
        mount: true,
        shallow: true,
        render: true,
      },
    },
  ],
};
