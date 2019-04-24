module.exports = {
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
    'react/prop-types': 0
  },
  env: {
    browser: true,
    node: true
  }
};
