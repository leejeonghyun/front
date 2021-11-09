module.exports = {
  'env': {
    'browser': true,
    'es6': true,
  },
  'extends': [
    'plugin:vue/essential',
    'google',
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parserOptions': {
    'parser': "babel-eslint",
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'plugins': [
    'html',
    'vue',
    'import'
  ],
  'rules': {
    'linebreak-style': 0,
    'object-curly-spacing': 0,
    'comma-dangle': 0,
    'arrow-parens': 0,
    'quotes': 0,
    'max-len': 0,
    'space-before-function-paren': 0,
    'indent': 0,
    'no-undef': 0,
    'no-unused-vars': 0,
    'no-console': 0,
    'no-extra-boolean-cast': 0,
    'no-useless-catch': 0,
    'operator-linebreak': 0,
  },
};
//
