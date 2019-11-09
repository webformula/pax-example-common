import { build } from '@webformula/pax-core';

build({
  rootFolder: 'app',
  pagesFolder: 'pages',
  layoutFilePath: 'app/layout/index.js',
  distFolder: 'dist',
  routerConfig: {
    root: 'home',
    fourOFour: 'fourOFour'
  },
  copyFiles: [
    {
      from: 'app/public/**',
      to: 'dist/'
    }
  ]
});
