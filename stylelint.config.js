export default {
  extends: ['stylelint-config-recommended'],
  rules: {
    'property-no-unknown': true,
  },
  overrides: [
    {
      files: '**.html',
      customSyntax: 'postcss-html',
    },
    {
      files: '**.js',
      customSyntax: 'postcss-styled-syntax',
    },
  ],
};
