import { defineConfig } from 'vite-plus';

export default defineConfig({
  root: 'public',

  build: {
    assetsInlineLimit: 0,
  },

  server: {
    port: 3000,
  },

  lint: {
    plugins: ['oxc', 'typescript', 'unicorn'],
    env: {
      builtin: true,
      node: true,
    },
    options: {
      typeAware: true,
      typeCheck: true,
    },
    jsPlugins: [
      {
        name: 'vite-plus',
        specifier: 'vite-plus/oxlint-plugin',
      },
    ],
  },

  fmt: {
    printWidth: 120,
    singleQuote: true,
    tabWidth: 2,
  },

  staged: {
    '*': 'vp check --fix',
  },
});
