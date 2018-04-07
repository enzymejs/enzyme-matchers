module.exports = {
  overrides: [
    {
      files: [
        '**/*.test.js',
        '**/*.test.jsx',
        '**/*.test.ts',
        '**/*.test.tsx',
        '**/*.spec.js',
        '**/*.spec.jsx',
        '**/*.spec.ts',
        '**/*.spec.tsx',
        '**/__tests__/**/*.test.js',
        '**/__tests__/**/*.test.jsx',
        '**/__tests__/**/*.test.ts',
        '**/__tests__/**/*.test.tsx',
        '**/__tests__/**/*.spec.js',
        '**/__tests__/**/*.spec.jsx',
        '**/__tests__/**/*.spec.ts',
        '**/__tests__/**/*.spec.tsx',
        '**/__tests__/**/*.js',
        '**/__tests__/**/*.jsx',
        '**/__tests__/**/*.ts',
        '**/__tests__/**/*.tsx',
      ],
      globals: {
        React: true,
        mount: true,
        shallow: true,
        render: true,
      },
    },
  ],
};
