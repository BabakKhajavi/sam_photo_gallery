module.exports = {
  extends: ['../../.eslintrc.cjs', 'react-app', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': 'error',
  },
};
