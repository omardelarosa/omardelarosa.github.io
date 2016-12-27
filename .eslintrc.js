module.exports = {
  parser: 'babel-eslint',
  'parserOptions': {
    'ecmaVersion': 2017,
    'ecmaFeatures': {
      'experimentalObjectRestSpread': true
    }
  },
  'env': {
    'shared-node-browser': true,
    'mocha': true,
  },
  'root': true,
  extends: 'airbnb/base',
  'plugins': [],
  // add your custom rules here
  'rules': {
    // allow debugging in development
    'no-console': 0,
    'no-debugger': 0,
    // tell no-shadow to fuck off
    'no-shadow': 0,
    // tell no-else-return to fuck off
    'no-else-return': 0,
    //tell arrow-body-style to FUCK OFF
    'arrow-body-style': 0,
    // disable maximum line length
    'max-len': 0,
    // disable quoted propety enforcement
    'quote-props': 0,
    'arrow-parens': 0,
    'semi': 2,
    'comma-dangle': 0,
    'no-unused-vars': 0,
    'space-before-function-paren': 0,
    'no-param-reassign': 0,
    // disable template string concat
    'prefer-template': 0,
    'eqeqeq': [2, 'allow-null'],
    'new-cap': 0,
    'camelcase': 0,

    // Nice to haves, raise warnings only
    'object-curly-spacing': 0,
    'key-spacing': 0,
    'object-shorthand': 1,
    'padded-blocks': 1,
    'array-bracket-spacing': 0,
    'no-constant-condition': 0,
    'keyword-spacing': 1,
  }
};
