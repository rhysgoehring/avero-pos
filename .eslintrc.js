module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true
    }
  },
  extends: ['airbnb', 'prettier', 'prettier/react'],
  plugins: ['react', 'prettier'],
  rules: {
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx']
      }
    ],
    'prettier/prettier': 'error',
    'no-console': 0,
    'consistent-return': 0,
    'react/destructuring-assignment': 0,
    'react/prop-types': 0,
    'spaced-comment': 0,
    'no-case-declarations': 0,
    'react/no-access-state-in-setstate': 0,
    'no-else-return': 0
  },
  env: {
    browser: true,
    node: true
  }
};
