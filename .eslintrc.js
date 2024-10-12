module.exports = {
    parserOptions: {
      requireConfigFile: false,  // This tells ESLint not to require a Babel config file
      ecmaVersion: 2020,
      sourceType: 'module'
    },
    env: {
      browser: true,
      node: true
    },
    extends: [
      'plugin:vue/vue3-recommended',
      'eslint:recommended'
    ],
    rules: {
      // Your custom rules here
    }
  };
  