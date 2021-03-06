import { build } from '@webformula/pax-core';

build({
  rootFolder: 'app',
  pagesFolder: 'pages',
  layoutFilePath: 'layout/index.js',
  distFolder: 'build',
  // css: {
  //   concat: false,
  //   filename: 'main.css'
  // },
  routerConfig: {
    root: 'home',
    fourOFour: 'fourOFour'
  },
  copyFiles: [
    {
      from: 'app/public/**',
      to: 'build/'
    }
  ]
});
