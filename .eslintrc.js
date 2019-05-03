module.exports = {
  root: true,
  env: {
    node: true,
    'jest/globals': true
  },
  'plugins': [
    'jest'
  ],
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "no-irregular-whitespace": ['error', { 'skipRegExps': true }]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
